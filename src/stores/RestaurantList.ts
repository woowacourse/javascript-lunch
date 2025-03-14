import { RestaurantItem } from "../types/restaurantItem";

class RestaurantList {
  #list: RestaurantItem[];

  constructor(data: RestaurantItem[]) {
    this.#list = data;
  }

  get list(): RestaurantItem[] {
    return this.#list;
  }

  updateList(restaurant: RestaurantItem) {
    this.#list.push(restaurant);
  }
}

export default RestaurantList;
