import { Restaurant } from "../type/restaurant";

class Restaurants {
  #list: Restaurant[] = [];
  #nodeList: Element[] = [];

  add(restaurant: Restaurant) {
    this.#list.push(restaurant);
  }

  addNode(node: any) {
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
