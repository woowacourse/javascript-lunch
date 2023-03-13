import { RestaurantForm } from "../global/types";

export class Restaurant {
  #information: RestaurantForm;

  constructor(restaurantInfo: RestaurantForm) {
    this.#information = restaurantInfo;
  }

  get information() {
    return this.#information;
  }
}
