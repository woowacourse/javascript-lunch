import { Restaurant } from '../types';

import deepCopy from '../utils/deepCopy';

import dummyRestaurants from '../constants/dummyRestaurants';

export default class Restaurants {
  #restaurants: Restaurant[];

  constructor(data: Restaurant[] = dummyRestaurants) {
    this.#restaurants = data;
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
  }

  toggleFavoriteRestaurant(restaurantId: number) {
    const targetIndex = this.#restaurants.findIndex((restaurant) => restaurant.id === restaurantId);

    this.#restaurants[targetIndex].isFavorite = !this.#restaurants[targetIndex].isFavorite;
  }

  deleteRestaurant(restaurantId: number) {
    const restaurantsAfterDeleted = this.#restaurants.filter(
      (restaurant) => restaurant.id !== restaurantId
    );

    this.#restaurants = restaurantsAfterDeleted;
  }

  getRestaurants() {
    return deepCopy(this.#restaurants);
  }

  getRestaurantById(restaurantId: number) {
    return this.#restaurants.find((restaurant) => restaurant.id === restaurantId);
  }
}
