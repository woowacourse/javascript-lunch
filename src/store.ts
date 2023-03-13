import Filters from './components/Filters';
import RestaurantList from './components/RestaurantList';
import { IRestaurant, Restaurant } from './domain/Restaurant';
import RestaurantService from './domain/RestaurantService';
import { CategoryOptions, FilterOptions, TabType } from './types/type';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

interface IStore {
  $listArticle?: HTMLElement;
  restaurantList?: RestaurantList;
  filters?: Filters;
  currentTab: TabType;
  currentCategory: CategoryOptions;
  currentFilter: FilterOptions;
  currentList: Restaurant[];
  restaurantService: RestaurantService;
  setListArticle: ($listArticle: HTMLElement) => void;
  setRestaurantListAndFilters: (props: ISetListAndFilter) => void;
  getFavoriteList: () => Restaurant[];
  addRestaurantInfo: (restaurantInfo: IRestaurant) => void;
  deleteRestaurantInfo: (id: number) => void;
  updateLocalStorage: () => void;
  getCurrentFilteredAndSortedList: () => Restaurant[];
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
  currentCategory: '전체',
  currentFilter: '이름순',
  currentList: [],

  setRestaurantListAndFilters({ restaurantList, filters }: ISetListAndFilter) {
    this.restaurantList = restaurantList;
    this.filters = filters;
  },

  setListArticle($listArticle: HTMLElement) {
    this.$listArticle = $listArticle;
  },

  getFavoriteList() {
    const favorites = store.restaurantService.getFilterdFavoriteList();
    const favoriteNameSorted = store.restaurantService.sortByName(favorites);

    return favoriteNameSorted;
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

  getCurrentFilteredAndSortedList() {
    const { currentCategory, currentFilter } = store;

    const filteredAndSortedList =
      store.restaurantService.getFilteredAndSortedList(
        currentCategory,
        currentFilter
      );
    return filteredAndSortedList;
  },

  renderListArticle() {
    if (!this.$listArticle) return;

    this.$listArticle.innerHTML = '';
    const { currentTab } = store;

    switch (currentTab) {
      case 'all':
        this.currentList = this.getCurrentFilteredAndSortedList();
        this.filters?.render(this.$listArticle);
        this.restaurantList?.render(this.$listArticle);
        break;
      case 'favorite':
        this.currentList = this.getFavoriteList();
        this.restaurantList?.render(this.$listArticle);
        break;
      default:
        return;
    }
  },
};
