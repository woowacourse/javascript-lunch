import RestaurantList from '../components/restaurantList.js';
import { filterCategory, sortByDistance, sortByName } from './filter';
import { RestaurantType } from '../type';
import { isValidName } from '../validator';
import { initialRestaurantList } from '../constants/initialRestaurantList';
import { FILTER_OPTION } from '../constants/filter';
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

    this.renderRestaurantList(this.initLocalStorageItems());
  }

  private initLocalStorageItems() {
    return window.localStorage.length
      ? getAllDataOnLocalStorage()
      : initialRestaurantList;
  }

  public static getInstance() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = new RestaurantsController();
    }

    return RestaurantsController.instance;
  }

  addNewRestaurant(event: Event) {
    const newRestaurant = this.getNewRestaurant(event);

    try {
      isValidName(newRestaurant.name);
    } catch (error: !unknown) {
      alert(error.message);

      return false;
    }

    this.renderRestaurantList([...this.restaurantList, newRestaurant]);

    return true;
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
      this.renderRestaurantList(sortByName(this.restaurantList));
    }

    if (value === FILTER_OPTION.DISTANCE) {
      this.renderRestaurantList(sortByDistance(this.restaurantList));
    }
  }

  filterRestaurantList(value: string) {
    filterCategory(value);
  }

  renderRestaurantList(restaurantList: RestaurantType[]) {
    this.restaurantList = restaurantList;
    this.restaurantListComponent.render(this.restaurantList);
    saveOnLocalStorage(this.restaurantList);
  }
}

export default RestaurantsController;
