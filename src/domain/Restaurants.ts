import RestaurantList from "../components/RestaurantList";
import { Restaurant } from "../type/restaurant";

class Restaurants {
  #list: Restaurant[] = [];
  #nodeList: RestaurantList[] = [];

  add(restaurant: Restaurant) {
    this.#list.push(restaurant);
  }

  addNode(node: RestaurantList) {
    this.#nodeList?.push(node);
  }

  getList() {
    return this.#list.map((restaurant: Restaurant) => ({ ...restaurant }));
  }

  getNodeList() {
    return [...this.#nodeList];
  }
}

export default Restaurants;
