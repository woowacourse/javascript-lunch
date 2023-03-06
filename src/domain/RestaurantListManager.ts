import "../types/restaurant";

export default class RestaurantListManager {
  #restaurantList: RestaurantInfo[];

  constructor(restaurants: RestaurantInfo[]) {
    this.#restaurantList = restaurants;
  }

  addRestaurant(info: RestaurantInfo): void {
    this.#restaurantList.push(info);
  }

  getRestaurantList(): RestaurantInfo[] {
    return this.#restaurantList;
  }
}
