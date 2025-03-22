import { FilterOptions, Restaurant } from "../../types";
import { DEFAULT_FILTER_OPTIONS, DEFAULT_RESTAURANT } from "../constants";
import RestaurantStorage from "../storages/RestaurantStorage.js";
import generateUUID from "../utils/generateUUID.js";

type Listeners = Map<string, (state: StoreState) => void>;

interface StoreState {
  restaurants: Restaurant[];
  currentFilter: FilterOptions;
  selectedRestaurant: Restaurant;
}

export default class RestaurantStore {
  private storage: RestaurantStorage = new RestaurantStorage();

  #restaurants: StoreState["restaurants"] = [];
  #currentFilter: StoreState["currentFilter"] = DEFAULT_FILTER_OPTIONS;
  #selectedRestaurant: Restaurant | null = null;
  #listeners: Listeners = new Map();

  constructor() {
    const savedRestaurants = this.storage.getRestaurants();
    if (savedRestaurants) {
      this.#restaurants = savedRestaurants;
      this.#notifyListeners();
    }
  }

  get state(): StoreState {
    return {
      restaurants: this.#restaurants,
      currentFilter: this.#currentFilter,
      selectedRestaurant: this.#selectedRestaurant ?? DEFAULT_RESTAURANT,
    };
  }

  addRestaurant(restaurant: Omit<Restaurant, "id" | "isFavorite">) {
    const newRestaurant: Restaurant = {
      ...restaurant,
      id: generateUUID(),
      isFavorite: false,
    };
    this.#restaurants = [...this.#restaurants, newRestaurant];
    this.storage.setRestaurants(this.#restaurants);
    this.#notifyListeners();
  }

  deleteRestaurant(restaurantId: Restaurant["id"]) {
    this.#restaurants = this.#restaurants.filter(
      (restaurant) => restaurant.id !== restaurantId
    );
    this.storage.setRestaurants(this.#restaurants);
    this.#notifyListeners();
  }

  toggleFavorite(restaurantId: Restaurant["id"]) {
    this.#restaurants = this.#restaurants.map((restaurant) =>
      restaurant.id === restaurantId
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    this.updateSelectedRestaurant(restaurantId);
    this.storage.setRestaurants(this.#restaurants);
    this.#notifyListeners();
  }

  setFilter(options: FilterOptions) {
    this.#currentFilter = options;
    this.#notifyListeners();
  }

  updateSelectedRestaurant(restaurantId: Restaurant["id"]) {
    const restaurantInfoById = this.#restaurants.find(
      (restaurant) => restaurant.id === restaurantId
    );
    if (restaurantInfoById) {
      this.#selectedRestaurant = restaurantInfoById;
    }
    this.#notifyListeners();
  }

  subscribe(key: string, callback: (state: StoreState) => void) {
    this.#listeners.set(key, callback);
    callback(this.state);

    return () => this.#listeners.delete(key);
  }

  #notifyListeners() {
    this.#listeners.forEach((listener) => listener(this.state));
  }
}
