import { Restaurant } from "../type/restaurant";

class Restaurants {
  #list: Restaurant[] = [];

  add(restaurant: Restaurant) {
    this.#list.push(restaurant);
  }

  getList() {
    return this.#list.map((restaurant: Restaurant) => ({ ...restaurant }));
  }
}

export default Restaurants;
