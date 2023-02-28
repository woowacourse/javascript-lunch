import Restaurant from "../type/restaurant";

class Restaurants {
  #list: Restaurant[] = [];

  add(restaurant: Restaurant) {
    this.#list.push(restaurant);
  }
}

export default Restaurants;
