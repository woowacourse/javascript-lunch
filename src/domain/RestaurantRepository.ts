import { RestaurantInfo } from "../types/restaurant";

export default class RestaurantRepository {
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
