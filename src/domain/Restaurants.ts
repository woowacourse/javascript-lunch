import { Restaurant } from '../types';

export default class Restaurants {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
  }

  getRestaurants() {
    return this.#restaurants;
  }
}
