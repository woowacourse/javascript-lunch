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
}

export default Restaurants;
