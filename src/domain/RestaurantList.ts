import { CATEGORY_WITH_ENTIRE } from "../constants/selectOptions";
import sortLetters from "../utils/sortLetters";

class RestaurantList {
  static #restaurants: Map<string, Restaurant> = new Map();
  static #sortCallback: Record<
    SortStandard,
    (a: Restaurant, b: Restaurant) => number
  > = {
    이름순: (a: Restaurant, b: Restaurant) => sortLetters(a.name, b.name),
    거리순: (a: Restaurant, b: Restaurant) => a.distance - b.distance,
  };

  static init(restaurants: Restaurant[] = []) {
    const restaurantEntries: [string, Restaurant][] = restaurants.map(
      (restaurant) => [restaurant.name, restaurant]
    );
    RestaurantList.#restaurants = new Map(restaurantEntries);
  }

  static getRestaurants() {
    return Array.from(this.#restaurants.values());
  }

  static add(restaurant: Restaurant) {
    this.#restaurants.set(restaurant.name, restaurant);
    return this;
  }

  static delete(name: string) {
    if (this.#restaurants.get(name) === undefined) {
      throw new Error("NAME IS UNDEFINED");
    }
    this.#restaurants.delete(name);
  }

  static getOrderedRestaurant({
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

  static #filterByCategory(category: CategoryWithEntire) {
    const restaurants = this.getRestaurants();
    if (category === CATEGORY_WITH_ENTIRE[0]) {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.category === category);
  }
}

export default RestaurantList;
