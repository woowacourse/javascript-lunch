import Restaurant from "./Restaurant";
import { Category, NameOrDistance } from "./types";

class RestaurantList {
  #restaurantList: Restaurant[] = [];
  #currentCategory: Category = "";
  #nameOrDistance: NameOrDistance = "";

  constructor(restaurantList: Restaurant[] = []) {
    this.#restaurantList = restaurantList;
  }

  add(restaurant: Restaurant) {
    this.#restaurantList.push(restaurant);
  }

  delete(restaurant: Restaurant) {
    this.#restaurantList = this.#restaurantList.filter(
      (item) => item !== restaurant
    );
  }

  filter(): Restaurant[] {
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

  getFavoriteList(): Restaurant[] {
    const favoriteList = this.#restaurantList.filter(
      (restaurant) => restaurant.value.isFavorite
    );

    return favoriteList;
  }

  filterByCategory(category: Category, list: Restaurant[]) {
    if (category === "") {
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

  setCategory(category: Category) {
    this.#currentCategory = category;
  }

  setNameOrDistance(sortBy: NameOrDistance) {
    this.#nameOrDistance = sortBy;
  }

  get list(): Restaurant[] {
    return [...this.#restaurantList];
  }
}

export default RestaurantList;
