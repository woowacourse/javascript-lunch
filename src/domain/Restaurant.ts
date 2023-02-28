import "../types/restaurant";

export default class Restaurant {
  #info: RestaurantInfo;

  constructor(info: RestaurantInfo) {
    this.#info = info;
  }

  getInfo(): RestaurantInfo {
    return Object.assign(this.#info);
  }
}
