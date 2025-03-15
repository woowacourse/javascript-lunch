import { Category, Restaurant } from "../../types/RestaurantType.ts";
import RestaurantListContainer from "../component/RestaurantListContainer.ts";

class RestaurantList {
  #items;
  #filteringItems;

  constructor(items: Restaurant[]) {
    this.#items = items;
    this.#filteringItems = items;
    this.sortByName();
  }

  add(newRestaurant: Restaurant) {
    this.#items.push(newRestaurant);
    this.resetFilter();
  }

  filterByCategory(category: Category) {
    this.#filteringItems = this.#items.filter(
      ({ category: c }) => c === category
    );
    RestaurantListContainer(this.#filteringItems);
  }

  resetFilter() {
    this.#filteringItems = this.#items;
    RestaurantListContainer(this.#items);
  }

  sortByName() {
    RestaurantListContainer(
      this.#filteringItems.sort((a, b) => a.name.localeCompare(b.name))
    );
  }

  sortByDistance() {
    RestaurantListContainer(
      this.#filteringItems.sort((a, b) => a.distance - b.distance)
    );
  }
}

export default RestaurantList;
