import RestaurantList from "../domain/RestaurantList";
import StatusController from "./StatusController";
import getLocalStorageItem from "../utils/getLocalStorageItem";
import { restaurantData } from "../data/restaurantData";
import setLocalStorage from "../utils/setLocalStorage";

class RestaurantListController {
  static #entireRestaurantList = new RestaurantList();
  static #favoriteRestaurantList = new RestaurantList();
  static #ENTIRE_RESTAURANTS_KEY = "entireRestaurants";

  static initEntireRestaurantList() {
    const restaurants =
      getLocalStorageItem(this.#ENTIRE_RESTAURANTS_KEY) ?? restaurantData;

    setLocalStorage(this.#ENTIRE_RESTAURANTS_KEY, restaurants);

    this.#entireRestaurantList.init(restaurants);
  }

  static addToEntireRestaurantList(restaurant: Restaurant) {
    this.#entireRestaurantList.add(restaurant);

    const entireRestaurants = this.#entireRestaurantList.getRestaurants();

    setLocalStorage(this.#ENTIRE_RESTAURANTS_KEY, entireRestaurants);
  }

  static getNowRestaurantItem() {
    const filterSelection = StatusController.getFilterSelection();

    const restaurantItems =
      this.#entireRestaurantList.getOrderedRestaurant(filterSelection);

    return restaurantItems;
  }
}

export default RestaurantListController;
