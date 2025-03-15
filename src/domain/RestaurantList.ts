import { Category, Restaurant } from "../../types/RestaurantType.ts";
import Modal from "../component/Modal.js";
import RestaurantListContainer from "../component/RestaurantListContainer.js";
import MOCK_ITEM from "../mockItem.js";

class RestaurantList {
  #items;
  #filteringItems;

  constructor() {
    if (!localStorage.getItem("restaurantList")) {
      localStorage.setItem(
        "restaurantList",
        JSON.stringify(MOCK_ITEM.restaurantList)
      );
    }
    this.#items = JSON.parse(localStorage.getItem("restaurantList") || "[]");
    this.#filteringItems = this.#items;
    this.sortByName();
  }

  add(newRestaurant: Restaurant) {
    this.#items.push(newRestaurant);
    localStorage.setItem("restaurantList", JSON.stringify(this.#items));
    this.resetFilter();
  }

  filterByCategory(category: Category) {
    this.#filteringItems = this.#items.filter(
      ({ category: c }: Restaurant) => c === category
    );
    RestaurantListContainer(this.#filteringItems);
  }

  resetFilter() {
    this.#filteringItems = this.#items;
    RestaurantListContainer(this.#items);
  }

  sortByName() {
    RestaurantListContainer(
      this.#filteringItems.sort((a: Restaurant, b: Restaurant) =>
        a.name.localeCompare(b.name)
      )
    );
  }

  sortByDistance() {
    RestaurantListContainer(
      this.#filteringItems.sort(
        (a: Restaurant, b: Restaurant) => a.distance - b.distance
      )
    );
  }

  static remove(targetName: string, modalId: string) {
    Modal.close(modalId);
    let restaurantList = JSON.parse(
      localStorage.getItem("restaurantList") || "[]"
    );
    restaurantList = restaurantList.filter(
      (restaurant: Restaurant) => restaurant.name !== targetName
    );
    localStorage.setItem("restaurantList", JSON.stringify(restaurantList));
    RestaurantListContainer(
      restaurantList.sort((a: Restaurant, b: Restaurant) =>
        a.name.localeCompare(b.name)
      )
    );
  }
}

export default RestaurantList;
