import { CustomError, RestaurantType } from '../type';
import { getFormData } from '../util/form';
import { validateName } from '../validator';
import { initialRestaurantData } from '../constant/initialRestaurants';
import {
  getAllDataOnLocalStorage,
  saveOnLocalStorage,
} from '../util/localStorage';
// import {
//   renderNewRestaurant,
//   renderRestaurantList,
// } from '../ui/restaurantListRenderer';
import { filterCategory, sortByDistance, sortByName } from './filter';
import { SELECTED_OPTION } from '../constant';

export default class RestaurantsController {
  private static instance: RestaurantsController;
  private restaurantList: RestaurantType[] = [];

  private constructor() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = this;
    }
    this.initRestaurantsInfos();
  }

  private initRestaurantsInfos() {
    window.localStorage.length
      ? this.updateRestaurantList(getAllDataOnLocalStorage())
      : this.updateRestaurantList(initialRestaurantData);

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
    // renderNewRestaurant(restaurantInfo);

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
    // renderRestaurantList(this.restaurantList);
  }
}
