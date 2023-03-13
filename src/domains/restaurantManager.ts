import { getFormData } from '../utils/form';
import { isValidName } from '../validator';
import {
  getListOnLocalStorage,
  saveListOnLocalStorage,
} from '../utils/localStorage';
import { RestaurantType } from '../type/types';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { initialRestaurantList } from '../constants/initialRestaurantList';

class restaurantManager {
  private static instance: restaurantManager;
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

  public addNewRestaurant(event: Event) {
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

  public getNewRestaurant(event: Event) {
    const trimmedNewRestaurant = getFormData(event).map(([key, value]) => [
      key,
      String(value).trim(),
    ]);

    return Object.fromEntries(trimmedNewRestaurant);
  }

  public updateRestaurantList(restaurantList: RestaurantType[]) {
    this.restaurantList = restaurantList;
    saveListOnLocalStorage(
      LOCAL_STORAGE_KEY.RESTAURANT_LIST,
      this.restaurantList
    );
  }

  public updateFavoriteList(favoriteList: RestaurantType[]) {
    this.favoriteList = favoriteList;
    saveListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST, this.favoriteList);
  }
}

export default restaurantManager;
