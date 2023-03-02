import RestaurantType from "../type/Restaurant";
import Restaurant from "./model/Restaurant";

class Controller {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
  }

  addRestaurant(newRestaurant: RestaurantType) {
    this.#restaurants.push(new Restaurant(newRestaurant));
  }
}
