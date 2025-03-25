import { Category, Restaurant } from "../../types/RestaurantType.ts";
import MOCK_ITEM from "../mockItem.js";
import storage from "../storage/storage.js";

class RestaurantList {
  #items: Restaurant[];
  #totalTab: boolean;
  #category: Category;
  #renderingItems: Restaurant[];

  constructor() {
    if (!storage.getItem("restaurantList")) {
      storage.setItem("restaurantList", MOCK_ITEM.restaurantList);
    }
    this.#totalTab = true;
    this.#category = "선택해 주세요";
    this.#items = storage.getItem("restaurantList") || "[]";
    this.#renderingItems = this.#items;

    this.sortByName();
  }

  setStorage() {
    storage.setItem("restaurantList", this.#items);
  }

  setCategoryTab(category: Category) {
    this.#category = category;
  }

  toggleTotalTab() {
    this.#totalTab = !this.#totalTab;
  }

  get items() {
    this.#renderingItems = this.filterByCategory();
    if (!this.#totalTab) {
      this.#renderingItems = this.filterByFavorite(this.#renderingItems);
    }
    return this.#renderingItems;
  }

  resetFilter() {
    this.#items = storage.getItem("restaurantList") || "[]";
    this.#category = "선택해 주세요";
  }

  add(newRestaurant: Restaurant) {
    this.#items.push(newRestaurant);
    this.setStorage();
  }

  sortByName() {
    this.#items = this.#items.sort((a: Restaurant, b: Restaurant) =>
      a.name.localeCompare(b.name)
    );
  }

  sortByDistance() {
    this.#items.sort((a: Restaurant, b: Restaurant) => a.distance - b.distance);
  }

  filterByCategory() {
    if (this.#category === "선택해 주세요") {
      return this.#items;
    }
    return this.#items.filter(
      ({ category: c }: Restaurant) => c === this.#category
    );
  }

  filterByFavorite(data: Restaurant[]) {
    return data.filter((restaurant: Restaurant) => restaurant.favorite);
  }

  remove(targetName: string) {
    this.#items = this.#items.filter(
      (restaurant: Restaurant) => restaurant.name !== targetName
    );
    this.setStorage();
  }

  changeFavoriteState(targetName: string) {
    this.#items = this.#items.map((restaurant: Restaurant) =>
      restaurant.name === targetName
        ? { ...restaurant, favorite: !restaurant.favorite }
        : restaurant
    );
    this.setStorage();
  }
}

export default RestaurantList;
