import { NAV_BAR_KEYS } from "../constants/constants.js";
import generateUUID from "../utils/generateUUID.js";

export default class RestaurantStore {
  #restaurants = [];
  #listeners = new Set();

  constructor() {
    this.#loadFromLocalStorage();
  }

  #loadFromLocalStorage() {
    const savedRestaurants = localStorage.getItem("restaurants");
    const savedFavorites = localStorage.getItem("favorites");

    this.#restaurants = savedRestaurants
      ? JSON.parse(savedRestaurants).map((restaurant) => ({
          ...restaurant,
          isFavorite: savedFavorites
            ? JSON.parse(savedFavorites).includes(restaurant.id)
            : false,
        }))
      : [];
  }

  #saveToLocalStorage() {
    localStorage.setItem("restaurants", JSON.stringify(this.#restaurants));

    const favorites = this.#restaurants
      .filter((restaurant) => restaurant.isFavorite)
      .map((restaurant) => restaurant.id);

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  addRestaurant(restaurant) {
    const newRestaurant = {
      ...restaurant,
      id: generateUUID(),
      isFavorite: false,
    };
    this.#restaurants = [...this.#restaurants, newRestaurant];
    this.#saveToLocalStorage();
    this.#notifyListeners();
  }

  getRestaurants({ tabType, filterType }) {
    const restaurants = [...this.#restaurants];

    return tabType && tabType === NAV_BAR_KEYS.favorite
      ? restaurants.filter((restaurant) => restaurant.isFavorite)
      : filterType && filterType.categoryFilterType !== "전체"
      ? restaurants.filter(
          (restaurant) => restaurant.category === filterType.categoryFilterType
        )
      : restaurants;
  }

  toggleFavorite(restaurantId) {
    this.#restaurants = this.#restaurants.map((restaurant) =>
      restaurant.id === restaurantId
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    this.#saveToLocalStorage();
    this.#notifyListeners();
  }

  subscribe(listener) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  #notifyListeners() {
    this.#listeners.forEach((listener) => listener(this.#restaurants));
  }
}
