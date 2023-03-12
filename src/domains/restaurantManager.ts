import RestaurantList from '../components/restaurantList.js';
import { filterCategory, sortByDistance, sortByName } from './filter';
import { RestaurantType } from '../type';
import { isValidName } from '../validator';
import { FILTER_OPTION } from '../constants/filter';
import { getFormData } from '../utils/form';
import {
  getListOnLocalStorage,
  saveListOnLocalStorage,
} from '../utils/localStorage';
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
    this.favoriteList = isExistRestaurantList
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

  sortRestaurantList(value: string) {
    if (value === FILTER_OPTION.NAME) {
      this.restaurantListComponent.render(sortByName(this.restaurantList));
    }

    if (value === FILTER_OPTION.DISTANCE) {
      this.restaurantListComponent.render(sortByDistance(this.restaurantList));
    }
  }

  filterRestaurantList(value: string) {
    filterCategory(value);
  }

  updateRestaurantList(restaurantList: RestaurantType[]) {
    this.restaurantList = restaurantList;
    saveListOnLocalStorage(
      LOCAL_STORAGE_KEY.RESTAURANT_LIST,
      this.restaurantList
    );
  }
}

export default restaurantManager;
