import type { Restaurant } from "../types/restaurant";

class Restaurants {
  #list: Restaurant[];

  constructor(list: Restaurant[]) {
    this.#list = list;
  }

  getList() {
    return this.#list;
  }

  length() {
    return this.#list.length.toString();
  }

  add(restaurant: Restaurant) {
    this.#list = [...this.#list, restaurant];
  }

  getTargetRestaurant(targetName: string) {
    return this.#list.find((restaurant) => restaurant.name === targetName);
  }

  deleteTargetRestaurant(targetName: string) {
    this.#list = this.#list.filter(
      (restaurant) => restaurant.name !== targetName
    );
  }

  toggleTargetRestaurantFavorite(targetName: string) {
    this.#list = this.#list.map((restaurant) =>
      restaurant.name === targetName
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
  }
}

export default Restaurants;
