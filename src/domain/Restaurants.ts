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

  getRestaurants() {
    return deepCopy(this.#restaurants);
  }
}
