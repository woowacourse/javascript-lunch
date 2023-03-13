import Filters from './components/Filters';
import RestaurantList from './components/RestaurantList';
import { IRestaurant, Restaurant } from './domain/Restaurant';
import RestaurantService from './domain/RestaurantService';
import { CategoryOptions, FilterOptions, TabType } from './types/type';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

export interface IFilterProps {
  category: CategoryOptions;
  filter: FilterOptions;
}

interface IStore {
  $listArticle?: HTMLElement;
  restaurantList?: RestaurantList;
  filters?: Filters;
  currentTab: TabType;
  currentFilterOptions: IFilterProps;
  currentList: Restaurant[];
  restaurantService: RestaurantService;
  setListArticle: ($listArticle: HTMLElement) => void;
  setRestaurantListAndFilters: (props: ISetListAndFilter) => void;
  setCurrentFilterOptions: (options: IFilterProps) => void;
  addRestaurantInfo: (restaurantInfo: IRestaurant) => void;
  deleteRestaurantInfo: (id: number) => void;
  updateLocalStorage: () => void;
  renderListArticle: () => void;
}

export interface ISetListAndFilter {
  restaurantList: RestaurantList;
  filters: Filters;
}

const getInitialRestaurantList = () => {
  const localRestaurants = getLocalStorage('restaurants');

  if (typeof localRestaurants !== 'string') return [];

  return [...JSON.parse(localRestaurants)].map(
    (restaurant) => new Restaurant(restaurant)
  );
};

export const store: IStore = {
  restaurantService: new RestaurantService(getInitialRestaurantList()),
  currentTab: 'all',
  currentFilterOptions: {
    category: '전체',
    filter: '이름순',
  },
  currentList: [],

  setRestaurantListAndFilters({ restaurantList, filters }: ISetListAndFilter) {
    this.restaurantList = restaurantList;
    this.filters = filters;
  },

  setListArticle($listArticle: HTMLElement) {
    this.$listArticle = $listArticle;
  },

  setCurrentFilterOptions(options: IFilterProps) {
    store.currentFilterOptions = { ...options };
  },

  addRestaurantInfo(restaurantInfo: IRestaurant) {
    store.restaurantService.addRestaurant(restaurantInfo);

    this.currentList = this.restaurantService.getRestaurantsInfo();

    this.updateLocalStorage();
  },

  deleteRestaurantInfo(id: number) {
    store.restaurantService.deleteRestaurant(id);

    this.currentList = this.restaurantService.getRestaurantsInfo();

    this.updateLocalStorage();
  },

  updateLocalStorage() {
    const currentList = store.restaurantService.getWholeRestaurantList();

    setLocalStorage('restaurants', JSON.stringify(currentList));
  },

  renderListArticle() {
    if (!this.$listArticle) return;

    this.$listArticle.innerHTML = '';
    const { currentTab, currentFilterOptions, restaurantService } = this;

    switch (currentTab) {
      case 'all':
        const filteredAndSortedList =
          restaurantService.getFilteredAndSortedList(currentFilterOptions);

        this.currentList = filteredAndSortedList;

        this.filters?.render(this.$listArticle);
        this.restaurantList?.render(this.$listArticle);
        break;
      case 'favorite':
        const favorites = restaurantService.getFilterdFavoriteList();
        const favoriteNameSorted = restaurantService.sortByName(favorites);

        this.currentList = favoriteNameSorted;
        this.restaurantList?.render(this.$listArticle);
        break;
      default:
        return;
    }
  },
};
