import { IRestaurant } from '../types';

import deepCopy from '../utils/deepCopy';

export default class Restaurants {
  #restaurants: IRestaurant[];

  constructor(data: IRestaurant[] = []) {
    this.#restaurants = data;
  }

  addRestaurant(restaurant: IRestaurant) {
    this.#restaurants.push(restaurant);
  }

  toggleFavoriteRestaurant(restaurantId: number) {
    const targetIndex = this.#restaurants.findIndex((restaurant) => restaurant.id === restaurantId);

    this.#restaurants[targetIndex].isFavorite = !this.#restaurants[targetIndex].isFavorite;
  }

  deleteRestaurant(restaurantId: number) {
    const targetIndex = this.#restaurants.findIndex((restaurant) => restaurant.id === restaurantId);

    this.#restaurants.splice(targetIndex, 1);
  }

  getRestaurants() {
    return deepCopy(this.#restaurants);
  }

  getRestaurantById(restaurantId: number) {
    return this.#restaurants.find((restaurant) => restaurant.id === restaurantId);
  }
}
