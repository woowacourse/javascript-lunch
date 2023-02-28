import { Restaurant } from "../type/restaurant";

class Restaurants {
  #list: Restaurant[] = [];

  add(restaurant: Restaurant) {
    this.#list.push(restaurant);
  }

  getList() {
    return this.#list.map((restaurant: Restaurant) => ({ ...restaurant }));
  }

  sortByName() {
    return this.getList().sort((a, b) => {
      if (a.name <= b.name) return -1;
      return 1;
    });
  }

  sortByDistance() {
    return this.getList().sort((a, b) => a.distance - b.distance);
  }
}

export default Restaurants;
