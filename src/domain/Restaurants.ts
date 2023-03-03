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
    this.#list = this.getList().sort((a, b) => {
      if (a.name <= b.name) return -1;
      return 1;
    });
    return this.getList();
  }

  sortByDistance() {
    this.#list = this.getList().sort(
      (a, b) => Number(a.distance) - Number(b.distance)
    );
    return this.getList();
  }
}

export default Restaurants;
