import type { Category, Restaurant } from "../types/restaurant";

class Restaurants {
  #list;

  constructor(list: Restaurant[]) {
    this.#list = list;
  }

  getList() {
    return this.#list;
  }

  add(restaurant: Restaurant) {
    this.#list = [...this.#list, restaurant];
  }

  sortByName() {
    return [...this.#list].sort((first, second) =>
      first.name > second.name ? 1 : -1
    );
  }

  sortByDistance() {
    return [...this.#list].sort(
      (first, second) => first.distance - second.distance
    );
  }

  filterByCategory(category: Category) {
    return this.#list.filter((restaurant) => restaurant.category === category);
  }
}

export default Restaurants;
