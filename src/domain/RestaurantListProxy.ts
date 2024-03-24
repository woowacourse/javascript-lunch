import RestaurantList from "./RestaurantList";
import getLocalStorageItem from "../utils/getLocalStorageItem";
import { restaurantData } from "../data/restaurantData";
import setLocalStorage from "../utils/setLocalStorage";

class RestaurantListProxy {
  static #entireRestaurantList = new RestaurantList();
  static #favoriteRestaurantList = new RestaurantList();
  static #ENTIRE_RESTAURANTS_KEY = "entireRestaurants";
  static #FAVORITE_RESTAURANTS_KEY = "favoriteRestaurants";

  static init() {
    const entireRestaurants =
      getLocalStorageItem(this.#ENTIRE_RESTAURANTS_KEY) ?? restaurantData;

    const favoriteRestaurants =
      getLocalStorageItem(this.#FAVORITE_RESTAURANTS_KEY) ?? [];

    if (!getLocalStorageItem(this.#ENTIRE_RESTAURANTS_KEY))
      setLocalStorage(this.#ENTIRE_RESTAURANTS_KEY, entireRestaurants);

    this.#entireRestaurantList.init(entireRestaurants);
    this.#favoriteRestaurantList.init(favoriteRestaurants);
  }

  static addToEntireRestaurantList(restaurant: Restaurant) {
    this.#entireRestaurantList.add(restaurant);

    const entireRestaurants = this.#entireRestaurantList.getRestaurants();

    setLocalStorage(this.#ENTIRE_RESTAURANTS_KEY, entireRestaurants);
  }

  static addToFavoriteRestaurantList(name: string) {
    const favoriteRestaurant = this.#entireRestaurantList.getRestaurantByName(
      name
    ) as Restaurant;
    this.#favoriteRestaurantList.add(favoriteRestaurant);

    const favoriteRestaurants = this.#favoriteRestaurantList.getRestaurants();

    setLocalStorage(this.#FAVORITE_RESTAURANTS_KEY, favoriteRestaurants);
  }

  static getOrderedEntireRestaurants(
    category: CategoryWithEntire,
    sortStandard: SortStandard
  ) {
    const restaurants = this.#entireRestaurantList.getOrderedRestaurant({
      category,
      sortStandard,
    });

    return restaurants;
  }

  static getFavoriteRestaurants() {
    const restaurants = this.#favoriteRestaurantList.getRestaurants();

    return restaurants;
  }

  static hasRestaurantInFavoriteRestaurant(name: string) {
    return this.#favoriteRestaurantList.hasRestaurantName(name);
  }

  static getRestaurantInEntireRestaurant(name: string): Restaurant | undefined {
    return this.#entireRestaurantList.getRestaurantByName(name);
  }

  static deleteRestaurantInEntireRestaurant(name: string) {
    if (this.#favoriteRestaurantList.hasRestaurantName(name))
      RestaurantListProxy.deleteRestaurantInFavoriteRestaurantList(name);

    this.#entireRestaurantList.delete(name);
    setLocalStorage(
      RestaurantListProxy.#ENTIRE_RESTAURANTS_KEY,
      this.#entireRestaurantList.getRestaurants()
    );
  }

  static deleteRestaurantInFavoriteRestaurantList(name: string) {
    this.#favoriteRestaurantList.delete(name);
    setLocalStorage(
      RestaurantListProxy.#FAVORITE_RESTAURANTS_KEY,
      this.#favoriteRestaurantList.getRestaurants()
    );
  }
}

export default RestaurantListProxy;
