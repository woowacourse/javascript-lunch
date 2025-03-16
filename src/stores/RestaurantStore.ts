import { FilterOptions, Restaurant } from "../../types/interfaces.js";
import { CATEGORY, LABEL_KEYS, NAV_BAR_KEYS } from "../constants/constants.js";
import generateUUID from "../utils/generateUUID.js";

type Listeners = (restaurants: Restaurant[]) => void;

export default class RestaurantStore {
  #restaurants: Restaurant[] = [];
  #listeners: Set<Listeners> = new Set();

  constructor() {
    this.#loadFromLocalStorage();
  }

  #loadFromLocalStorage() {
    const savedRestaurants = localStorage.getItem("restaurants");
    this.#restaurants = savedRestaurants ? JSON.parse(savedRestaurants) : [];
  }

  #saveToLocalStorage() {
    localStorage.setItem("restaurants", JSON.stringify(this.#restaurants));
  }

  addRestaurant(restaurantInfo: Omit<Restaurant, "id" | "isFavorite">) {
    const newRestaurant: Restaurant = {
      ...restaurantInfo,
      id: generateUUID(),
      isFavorite: false,
    };
    this.#restaurants = [...this.#restaurants, newRestaurant];
    this.#saveToLocalStorage();
    this.#notifyListeners();
  }

  deleteRestaurant(restaurantId: Restaurant["id"]) {
    this.#restaurants = this.#restaurants.filter(
      (restaurant) => restaurant.id !== restaurantId
    );
    this.#saveToLocalStorage();
    this.#notifyListeners();
  }

  getRestaurants({
    tabType,
    filterType: { categoryFilterType, sortFilterType },
  }: FilterOptions): Restaurant[] {
    const restaurants = [...this.#restaurants];

    const tabTypeFn = {
      [NAV_BAR_KEYS.all]: (restaurantsInfo: Restaurant[]) => {
        if (categoryFilterType === CATEGORY[0]) return restaurantsInfo;
        return restaurantsInfo.filter(
          (restaurant) => restaurant.category === categoryFilterType
        );
      },
      [NAV_BAR_KEYS.favorite]: (restaurantsInfo: Restaurant[]) => {
        return restaurantsInfo.filter((restaurant) => restaurant.isFavorite);
      },
    };

    const sortFilterTypeFn = {
      [LABEL_KEYS.name]: (restaurantsInfo: Restaurant[]) => {
        return restaurantsInfo.sort((a, b) => a.name.localeCompare(b.name));
      },
      [LABEL_KEYS.distance]: (restaurantsInfo: Restaurant[]) => {
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

  getRestaurantInfo(restaurantId: Restaurant["id"]): Restaurant | undefined {
    return this.#restaurants.find(
      (restaurant) => restaurant.id === restaurantId
    );
  }

  toggleFavorite(restaurantId: Restaurant["id"]) {
    this.#restaurants = this.#restaurants.map((restaurant) =>
      restaurant.id === restaurantId
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    this.#saveToLocalStorage();
    this.#notifyListeners();
  }

  subscribe(listener: Listeners) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  #notifyListeners() {
    this.#listeners.forEach((listener) => listener(this.#restaurants));
  }
}
