import { getFormData } from '../utils/form';
import { isValidName } from '../validator';
import RestaurantList from '../components/restaurantList.js';
import { sortByDistance, sortByName } from './sorter';
import {
  getListOnLocalStorage,
  saveListOnLocalStorage,
} from '../utils/localStorage';
import { RestaurantType } from '../type';
import { FILTER_OPTION } from '../constants/filter';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { initialRestaurantList } from '../constants/initialRestaurantList';

class restaurantManager {
  private static instance: restaurantManager;
  private restaurantListComponent: RestaurantList = new RestaurantList();
  private restaurantList: RestaurantType[] = [];
  private favoriteList: RestaurantType[] = [];

  private constructor() {
    if (!restaurantManager.instance) {
      restaurantManager.instance = this;
    }
  }

  public static getInstance() {
    if (!restaurantManager.instance) {
      restaurantManager.instance = new restaurantManager();
    }

    return restaurantManager.instance;
  }

  public initRestaurantList() {
    const isExistRestaurantList = getListOnLocalStorage(
      LOCAL_STORAGE_KEY.RESTAURANT_LIST
    ).length;
    const isExistFavoriteList = getListOnLocalStorage(
      LOCAL_STORAGE_KEY.RESTAURANT_LIST
    ).length;

    this.restaurantList = isExistRestaurantList
      ? getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
      : initialRestaurantList;
    this.favoriteList = isExistFavoriteList
      ? getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST)
      : [];

    saveListOnLocalStorage(
      LOCAL_STORAGE_KEY.RESTAURANT_LIST,
      this.restaurantList
    );
    saveListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST, this.favoriteList);
  }

  addNewRestaurant(event: Event) {
    const newRestaurant = this.getNewRestaurant(event);

    try {
      isValidName(newRestaurant.name);
      newRestaurant.number = this.restaurantList.length;
      newRestaurant.isFavorite = false;
      this.updateRestaurantList([...this.restaurantList, newRestaurant]);

      return true;
    } catch (error: !unknown) {
      alert(error.message);

      return false;
    }
  }

  getNewRestaurant(event: Event) {
    const trimmedNewRestaurant = getFormData(event).map(([key, value]) => [
      key,
      String(value).trim(),
    ]);

    return Object.fromEntries(trimmedNewRestaurant);
  }

  sortRestaurantList(sortingOption: string) {
    return sortingOption === FILTER_OPTION.NAME
      ? sortByName(this.restaurantList)
      : sortByDistance(this.restaurantList);
  }

  filterRestaurantList(selectingOption: string) {
    return selectingOption === FILTER_OPTION.ALL_CATEGORIES
      ? this.restaurantList
      : this.restaurantList.filter(
          restaurant => restaurant.category === selectingOption
        );
  }

  updateRestaurantList(restaurantList: RestaurantType[]) {
    this.restaurantList = restaurantList;
    saveListOnLocalStorage(
      LOCAL_STORAGE_KEY.RESTAURANT_LIST,
      this.restaurantList
    );
  }

  updateFavoriteList(favoriteList: RestaurantType[]) {
    this.favoriteList = favoriteList;
    saveListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST, this.favoriteList);
  }
}

export default restaurantManager;
