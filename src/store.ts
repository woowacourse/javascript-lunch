import { IRestaurant, Restaurant } from './domain/Restaurant';
import RestaurantService from './domain/RestaurantService';
import { CategoryOptions, FilterOptions, TabType } from './types/type';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

interface IStore {
  currentTab: TabType;
  currentCategory: CategoryOptions;
  currentFilter: FilterOptions;
  currentList: Restaurant[];
  restaurantService: RestaurantService;
  getFavoriteList: () => Restaurant[];
  addRestaurantInfo: (restaurantInfo: IRestaurant) => void;
  deleteRestaurantInfo: (id: number) => void;
  updateLocalStorage: () => void;
}

const getInitialRestaurantList = () => {
  const localRestaurants = getLocalStorage('restaurants');

  if (typeof localRestaurants !== 'string') return [];

  return [...JSON.parse(localRestaurants)].map(
    (restaurant) => new Restaurant(restaurant)
  );
};

export const store: IStore = {
  currentTab: 'all',
  currentCategory: '전체',
  currentFilter: '이름순',
  currentList: [],
  restaurantService: new RestaurantService(getInitialRestaurantList()),

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
};
