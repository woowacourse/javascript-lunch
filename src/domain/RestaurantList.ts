import { CATEGORY_WITH_ENTIRE } from "../constants/selectOptions";
import sortLetters from "../utils/sortLetters";

class RestaurantList {
  #restaurants: Map<string, Restaurant> = new Map();
  #sortCallback: Record<
    SortStandard,
    (a: Restaurant, b: Restaurant) => number
  > = {
    이름순: (a: Restaurant, b: Restaurant) => sortLetters(a.name, b.name),
    거리순: (a: Restaurant, b: Restaurant) => a.distance - b.distance,
  };

  constructor(restaurants: Restaurant[] = []) {
    this.init(restaurants);
  }

  init(restaurants: Restaurant[] = []) {
    const restaurantEntries: [string, Restaurant][] = restaurants.map(
      (restaurant) => [restaurant.name, restaurant]
    );
    this.#restaurants = new Map(restaurantEntries);
  }

  add(restaurant: Restaurant) {
    this.#restaurants.set(restaurant.name, restaurant);

    return this;
  }

  delete(name: string) {
    if (this.#restaurants.get(name) === undefined) {
      throw new Error(
        "[ERROR_IN_RestaurantList_delete()] This is invalid restaurant name"
      );
    }
    this.#restaurants.delete(name);
  }

  bringRestaurantInfo(name: string) {
    if (this.#restaurants.get(name) === undefined) {
      throw new Error(
        "[ERROR_IN_RestaurantList_bringRestaurantInfo()] This is invalid restaurant name"
      );
    }
    return this.#restaurants.get(name);
  }

  updateFavorites(name: string) {
    const restaurantValue = this.#restaurants.get(name);

    if (!restaurantValue) {
      throw new Error(
        "[ERROR_IN_RestaurantList_updateFavorites()] This is invalid restaurant name"
      );
    }

    const favoritesState = restaurantValue.favorites;
    const newRestaurantValue = {
      ...restaurantValue,
      favorites: !favoritesState,
    };

    this.#restaurants.set(name, newRestaurantValue);
  }

  convertedRestaurants() {
    return Array.from(this.#restaurants.values());
  }

  withFavorites() {
    const restaurants = this.convertedRestaurants();
    return restaurants.filter((restaurant) => restaurant.favorites === true);
  }

  getOrderedRestaurant({
    category,
    sortStandard,
  }: {
    category: CategoryWithEntire;
    sortStandard: SortStandard;
  }) {
    const filteredRestaurant = this.#filterByCategory(category);
    filteredRestaurant.sort(this.#sortCallback[sortStandard]);

    return filteredRestaurant;
  }

  #filterByCategory(category: CategoryWithEntire) {
    const restaurants = this.convertedRestaurants();
    if (category === CATEGORY_WITH_ENTIRE[0]) {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.category === category);
  }
}

export default RestaurantList;
