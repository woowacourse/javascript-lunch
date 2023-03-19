import { getFormData } from '../utils/form';
import { isValidName } from '../validator';
import { getListOnLocalStorage, saveListOnLocalStorage } from '../utils/localStorage';
import { RestaurantType } from '../type/types';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { initialRestaurantList } from '../constants/initialRestaurantList';

class RestaurantManager {
  private static instance: RestaurantManager;

  private restaurantList: RestaurantType[] = [];

  private favoriteList: RestaurantType[] = [];

  private constructor() {
    if (!RestaurantManager.instance) {
      RestaurantManager.instance = this;
    }
  }

  public static getInstance() {
    if (!RestaurantManager.instance) {
      RestaurantManager.instance = new RestaurantManager();
    }

    return RestaurantManager.instance;
  }

  private getInitList(listType: string, initList: RestaurantType[]): RestaurantType[] {
    return getListOnLocalStorage(listType).length ? getListOnLocalStorage(listType) : initList;
  }

  public initRestaurantList() {
    this.restaurantList = this.getInitList(
      LOCAL_STORAGE_KEY.RESTAURANT_LIST,
      initialRestaurantList
    );
    this.favoriteList = this.getInitList(LOCAL_STORAGE_KEY.FAVORITE_LIST, []);

    saveListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST, this.restaurantList);
    saveListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST, this.favoriteList);
  }

  public updateList(list: RestaurantType[], listType: string) {
    if (listType === LOCAL_STORAGE_KEY.RESTAURANT_LIST) {
      this.restaurantList = list;
      saveListOnLocalStorage(listType, this.restaurantList);
    } else {
      this.favoriteList = list;
      saveListOnLocalStorage(listType, this.favoriteList);
    }
  }

  private checkNewRestaurant(newRestaurant: RestaurantType) {
    isValidName(newRestaurant.name);
    newRestaurant.restaurantNumber = this.restaurantList.length;
    newRestaurant.isFavorite = false;
  }

  public addNewRestaurant(event: Event) {
    const newRestaurant = this.getNewRestaurant(event);

    try {
      this.checkNewRestaurant(newRestaurant);
      this.updateList([...this.restaurantList, newRestaurant], LOCAL_STORAGE_KEY.RESTAURANT_LIST);
    } catch (error) {
      if (error instanceof Error) alert(error.message);

      return false;
    }

    return true;
  }

  public getNewRestaurant(event: Event) {
    const trimmedNewRestaurant = getFormData(event).map(([key, value]) => [
      key,
      String(value).trim(),
    ]);

    return Object.fromEntries(trimmedNewRestaurant);
  }
}

export default RestaurantManager;
