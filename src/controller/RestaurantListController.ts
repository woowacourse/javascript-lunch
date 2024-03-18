import RestaurantList from "../domain/RestaurantList";
import StatusController from "./StatusController";
import getLocalStorageItem from "../utils/getLocalStorageItem";
import { restaurantData } from "../data/restaurantData";
import setLocalStorage from "../utils/setLocalStorage";

class RestaurantListController {
  static #entireRestaurantList = new RestaurantList();
  static #favoriteRestaurantList = new RestaurantList();
  static #ENTIRE_RESTAURANTS_KEY = "entireRestaurants";
  static #FAVORITE_RESTAURANTS_KEY = "favoriteRestaurants";

  static initEntireRestaurantList() {
    const entireRestaurants =
      getLocalStorageItem(this.#ENTIRE_RESTAURANTS_KEY) ?? restaurantData;

    const favoriteRestaurants =
      getLocalStorageItem(this.#FAVORITE_RESTAURANTS_KEY) ?? [];

    setLocalStorage(this.#ENTIRE_RESTAURANTS_KEY, entireRestaurants);

    this.#entireRestaurantList.init(entireRestaurants);
    this.#favoriteRestaurantList.init(favoriteRestaurants);
  }

  static addToEntireRestaurantList(restaurant: Restaurant) {
    this.#entireRestaurantList.add(restaurant);

    const entireRestaurants = this.#entireRestaurantList.getRestaurants();

    setLocalStorage(this.#ENTIRE_RESTAURANTS_KEY, entireRestaurants);
  }

  static addInFavoriteRestaurantList(name: string) {
    console.log("favorite add");
    const favoriteRestaurant = this.#entireRestaurantList.getRestaurantByName(
      name
    ) as Restaurant;
    this.#favoriteRestaurantList.add(favoriteRestaurant);

    const favoriteRestaurants = this.#favoriteRestaurantList.getRestaurants();

    setLocalStorage(this.#FAVORITE_RESTAURANTS_KEY, favoriteRestaurants);
  }

  static getNowEntireRestaurants() {
    const filterSelection = StatusController.getFilterSelection();

    const restaurants =
      this.#entireRestaurantList.getOrderedRestaurant(filterSelection);

    return restaurants;
  }

  static getFavoriteRestaurants() {
    const restaurants = this.#favoriteRestaurantList.getRestaurants();

    return restaurants;
  }

  static hasRestaurantInFavoriteRestaurant(name: string) {
    return this.#favoriteRestaurantList.hasRestaurantName(name);
  }

  static getRestaurantInEntireRestaurant(name: string): Restaurant {
    return this.#entireRestaurantList.getRestaurantByName(name) as Restaurant;
  }

  static deleteRestaurantInEntireRestaurant(name: string) {
    this.#entireRestaurantList.delete(name);
    setLocalStorage(
      RestaurantListController.#ENTIRE_RESTAURANTS_KEY,
      this.#entireRestaurantList.getRestaurants()
    );
  }

  static deleteInFavoriteRestaurantList(name: string) {
    this.#favoriteRestaurantList.delete(name);
    console.log(this.#favoriteRestaurantList.getRestaurants());
    setLocalStorage(
      RestaurantListController.#FAVORITE_RESTAURANTS_KEY,
      this.#favoriteRestaurantList.getRestaurants()
    );
  }
}

export default RestaurantListController;
