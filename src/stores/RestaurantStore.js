import { CATEGORY, LABEL_KEYS, NAV_BAR_KEYS } from "../constants/constants.js";
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

  getRestaurants({
    tabType,
    filterType: { categoryFilterType, sortFilterType },
  }) {
    const restaurants = [...this.#restaurants];

    const tabTypeFn = {
      [NAV_BAR_KEYS.all]: (restaurantsInfo) => {
        if (categoryFilterType === CATEGORY[0]) return restaurantsInfo;
        return restaurantsInfo.filter(
          (restaurant) => restaurant.category === categoryFilterType
        );
      },
      [NAV_BAR_KEYS.favorite]: (restaurantsInfo) => {
        return restaurantsInfo.filter((restaurant) => restaurant.isFavorite);
      },
    };

    const sortFilterTypeFn = {
      [LABEL_KEYS.name]: (restaurantsInfo) => {
        return restaurantsInfo.sort((a, b) => a.name.localeCompare(b.name));
      },
      [LABEL_KEYS.distance]: (restaurantsInfo) => {
        return restaurantsInfo.sort(
          (a, b) => parseInt(a.distance) - parseInt(b.distance)
        );
      },
    };

    if (tabType === NAV_BAR_KEYS.favorite) {
      return tabTypeFn[tabType](restaurants);
    }

    return sortFilterTypeFn[sortFilterType](tabTypeFn[tabType](restaurants));
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
