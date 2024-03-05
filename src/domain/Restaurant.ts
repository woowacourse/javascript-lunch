import { RestaurantType, CategoryType } from '../types';

class Restaurant {
  #restaurant;
  constructor(restaurant: RestaurantType) {
    this.#restaurant = restaurant;
  }
}

export default Restaurant;
