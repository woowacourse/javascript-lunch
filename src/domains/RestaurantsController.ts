import RestaurantList from '../components/restaurantList.js';
import { filterCategory, sortByDistance, sortByName } from './filter';
import { RestaurantType } from '../type';
import { isValidName } from '../validator';
import { FILTER_OPTION } from '../constants/filter';
import { getFormData } from '../utils/form';
import { saveListOnLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';

class RestaurantsController {
  private static instance: RestaurantsController;
  private restaurantListComponent: RestaurantList = new RestaurantList();
  private restaurantList: RestaurantType[] = [];
  private favoriteList: RestaurantType[] = [];

  private constructor() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = this;
    }
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
      this.updateRestaurantList([...this.restaurantList, newRestaurant]);
      this.restaurantListComponent.render([
        ...this.restaurantList,
        newRestaurant,
      ]);

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

export default RestaurantsController;
