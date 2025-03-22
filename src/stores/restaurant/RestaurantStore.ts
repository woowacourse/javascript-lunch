import { FilterOptions, Restaurant } from "../../../types/index.js";
import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_RESTAURANT,
} from "../../constants/index.js";
import RestaurantStorage from "../../storages/RestaurantStorage.js";
import generateUUID from "../../utils/generateUUID.js";
import { Observable } from "../core/Observable.js";

interface StoreState {
  restaurants: Restaurant[];
  currentFilter: FilterOptions;
  selectedRestaurant: Restaurant;
}

export default class RestaurantStore extends Observable<StoreState> {
  private storage: RestaurantStorage = new RestaurantStorage();

  #restaurants: StoreState["restaurants"] = [];
  #currentFilter: StoreState["currentFilter"] = DEFAULT_FILTER_OPTIONS;
  #selectedRestaurant: Restaurant | null = null;

  constructor() {
    super();
    const savedRestaurants = this.storage.getRestaurants();
    if (savedRestaurants) {
      this.#restaurants = savedRestaurants;
      this.notifyListeners();
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
    this.notifyListeners();
  }

  deleteRestaurant(restaurantId: Restaurant["id"]) {
    this.#restaurants = this.#restaurants.filter(
      (restaurant) => restaurant.id !== restaurantId
    );
    this.storage.setRestaurants(this.#restaurants);
    this.notifyListeners();
  }

  toggleFavorite(restaurantId: Restaurant["id"]) {
    this.#restaurants = this.#restaurants.map((restaurant) =>
      restaurant.id === restaurantId
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    this.updateSelectedRestaurant(restaurantId);
    this.storage.setRestaurants(this.#restaurants);
    this.notifyListeners();
  }

  setFilter(options: FilterOptions) {
    this.#currentFilter = options;
    this.notifyListeners();
  }

  updateSelectedRestaurant(restaurantId: Restaurant["id"]) {
    const restaurantInfoById = this.#restaurants.find(
      (restaurant) => restaurant.id === restaurantId
    );
    if (restaurantInfoById) {
      this.#selectedRestaurant = restaurantInfoById;
    }
    this.notifyListeners();
  }
}
