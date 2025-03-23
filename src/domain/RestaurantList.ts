import { ALL_OPTION } from "./consts";
import Restaurant from "./Restaurant";
import { CategoryFilter, NameOrDistanceFilter } from "./types";

class RestaurantList {
  #restaurantList: Restaurant[] = [];
  #currentCategory: CategoryFilter;
  #nameOrDistance: NameOrDistanceFilter;

  constructor(restaurantList: Restaurant[] = []) {
    this.#restaurantList = restaurantList;
    this.#currentCategory = "";
    this.#nameOrDistance = "";
  }

  add(restaurant: Restaurant) {
    this.#restaurantList.push(restaurant);
  }

  delete(restaurant: Restaurant) {
    this.#restaurantList = this.#restaurantList.filter(
      (item) => item !== restaurant
    );
  }

  get filteredList(): Restaurant[] {
    let filteredList = this.#restaurantList;
    filteredList = this.filterByCategory(this.#currentCategory, filteredList);

    if (this.#nameOrDistance === "name") {
      return this.filterByName(filteredList);
    }
    if (this.#nameOrDistance === "distance") {
      return this.filterByDistance(filteredList);
    }

    return filteredList;
  }

  get favoriteList(): Restaurant[] {
    const favoriteList = this.#restaurantList.filter(
      (restaurant) => restaurant.value.isFavorite
    );

    return favoriteList;
  }

  filterByCategory(category: CategoryFilter, list: Restaurant[]) {
    if (category === ALL_OPTION) {
      return list;
    }

    return list.filter((restaurant) => restaurant.value.category === category);
  }

  filterByName(list: Restaurant[]): Restaurant[] {
    return [...list].sort((a, b) => a.value.name.localeCompare(b.value.name));
  }

  filterByDistance(list: Restaurant[]): Restaurant[] {
    return [...list].sort((a, b) => a.value.distance - b.value.distance);
  }

  set category(category: CategoryFilter) {
    this.#currentCategory = category;
  }

  set nameOrDistance(sortBy: NameOrDistanceFilter) {
    this.#nameOrDistance = sortBy;
  }

  get value(): Restaurant[] {
    return [...this.#restaurantList];
  }
}

export default RestaurantList;
