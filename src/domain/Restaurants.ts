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

  getTargetRestaurant(targetId: string) {
    return this.#list.find((restaurant) => restaurant.id === targetId);
  }

  deleteTargetRestaurant(targetId: string) {
    this.#list = this.#list.filter((restaurant) => restaurant.id !== targetId);
  }

  toggleTargetRestaurantFavorite(targetId: string) {
    this.#list = this.#list.map((restaurant) =>
      restaurant.id === targetId
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
  }
}

export default Restaurants;
