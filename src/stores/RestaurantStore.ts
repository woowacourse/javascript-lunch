import { FilterOptions, Restaurant } from "../../types/interfaces.js";
import { CATEGORY, LABEL_KEYS, NAV_BAR_KEYS } from "../constants/constants.js";
import generateUUID from "../utils/generateUUID.js";

type Listeners = Map<string, (state: StoreState) => void>;

interface StoreState {
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  currentFilter: FilterOptions;
  selectedRestaurant: Restaurant;
}

export default class RestaurantStore {
  #restaurants: StoreState["restaurants"] = [];
  #currentFilter: StoreState["currentFilter"] = {
    tabType: NAV_BAR_KEYS.all,
    filterType: {
      categoryFilterType: CATEGORY[0],
      sortFilterType: "name",
    },
  };
  #selectedRestaurant: Restaurant = {} as Restaurant;
  #listeners: Listeners = new Map();

  constructor() {
    this.#loadFromLocalStorage();
  }

  get state(): StoreState {
    return {
      restaurants: this.#restaurants,
      filteredRestaurants: this.getFilteredRestaurants(this.#currentFilter),
      currentFilter: this.#currentFilter,
      selectedRestaurant: this.#selectedRestaurant,
    };
  }

  addRestaurant(restaurant: Omit<Restaurant, "id" | "isFavorite">) {
    const newRestaurant: Restaurant = {
      ...restaurant,
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

  toggleFavorite(restaurantId: Restaurant["id"]) {
    this.#restaurants = this.#restaurants.map((restaurant) =>
      restaurant.id === restaurantId
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    this.#saveToLocalStorage();
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

  getFilteredRestaurants({
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

  subscribe(key: string, callback: (state: StoreState) => void) {
    this.#listeners.set(key, callback);
    callback(this.state);

    return () => this.#listeners.delete(key);
  }

  #loadFromLocalStorage() {
    const savedRestaurants = localStorage.getItem("restaurants");
    if (savedRestaurants) {
      this.#restaurants = JSON.parse(savedRestaurants);
      this.#notifyListeners();
    }
  }

  #saveToLocalStorage() {
    localStorage.setItem("restaurants", JSON.stringify(this.#restaurants));
  }

  #notifyListeners() {
    this.#listeners.forEach((listener) => listener(this.state));
  }
}
