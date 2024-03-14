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

  init(restaurants: Restaurant[] = []) {
    const restaurantEntries: [string, Restaurant][] = restaurants.map(
      (restaurant) => [restaurant.name, restaurant]
    );
    this.#restaurants = new Map(restaurantEntries);
  }

  getRestaurants() {
    return Array.from(this.#restaurants.values());
  }

  add(restaurant: Restaurant) {
    if (this.#restaurants.get(restaurant.name) !== undefined) {
      throw new Error("NAME IS DUPLICATED");
    }
    this.#restaurants.set(restaurant.name, restaurant);
    return this;
  }

  delete(name: string) {
    if (this.#restaurants.get(name) === undefined) {
      throw new Error("NAME IS UNDEFINED");
    }
    this.#restaurants.delete(name);
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
    const restaurants = this.getRestaurants();
    if (category === CATEGORY_WITH_ENTIRE[0]) {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.category === category);
  }
}

export default RestaurantList;
