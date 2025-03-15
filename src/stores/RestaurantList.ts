import { RestaurantItem } from "../types/restaurantItem";

class RestaurantList {
  #list: RestaurantItem[];

  constructor(data: RestaurantItem[]) {
    this.#list = data;
  }

  get list(): RestaurantItem[] {
    return this.#list;
  }

  addRestaurant(restaurant: RestaurantItem) {
    this.#list.push(restaurant);
  }
}

export default RestaurantList;
