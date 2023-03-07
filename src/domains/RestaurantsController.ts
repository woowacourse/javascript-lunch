import RestaurantList from '../components/restaurantList.js';
import { filterCategory, sortByDistance, sortByName } from './filter';
import { CustomError, RestaurantType } from '../type';
import { validateName } from '../validator';
import { initialRestaurantList } from '../constants/initialRestaurantList';
import { SELECTED_OPTION } from '../constants';
import { getFormData } from '../utils/form';
import {
  getAllDataOnLocalStorage,
  saveOnLocalStorage,
} from '../utils/localStorage';

class RestaurantsController {
  private static instance: RestaurantsController;
  private restaurantListComponent: RestaurantList = new RestaurantList();
  private restaurantList: RestaurantType[] = [];

  private constructor() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = this;
    }
    this.initRestaurantsInfos();
  }

  private initRestaurantsInfos() {
    if (window.localStorage.length) {
      this.updateRestaurantList(getAllDataOnLocalStorage());
    } else {
      this.updateRestaurantList(initialRestaurantList);
    }

    this.saveRestaurantList();
  }

  public static getInstance() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = new RestaurantsController();
    }

    return RestaurantsController.instance;
  }

  addNewRestaurant(event: Event) {
    const trimmedInfo = getFormData(event).map(([key, value]) => [
      key,
      String(value).trim(),
    ]);

    const restaurantInfo = Object.fromEntries(trimmedInfo);

    try {
      validateName(restaurantInfo.name);
    } catch (error: unknown) {
      const customError = error as CustomError;
      return alert(customError.message);
    }

    saveOnLocalStorage(restaurantInfo);
    this.updateRestaurantList([...this.restaurantList, restaurantInfo]);
  }

  saveRestaurantList() {
    if (!window.localStorage.length) {
      this.restaurantList.forEach((restaurant: RestaurantType) =>
        saveOnLocalStorage(restaurant)
      );
    }
  }

  sortRestaurantList(value: string) {
    if (value === SELECTED_OPTION.NAME) {
      this.updateRestaurantList(sortByName(this.restaurantList));
    }

    if (value === SELECTED_OPTION.DISTANCE) {
      this.updateRestaurantList(sortByDistance(this.restaurantList));
    }
  }

  filterRestaurantList(value: string) {
    filterCategory(value);
  }

  updateRestaurantList(restaurantList: RestaurantType[]) {
    this.restaurantList = restaurantList;
    this.restaurantListComponent.render(this.restaurantList);
  }
}

export default RestaurantsController;
