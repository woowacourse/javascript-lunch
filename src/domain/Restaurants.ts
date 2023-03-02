import { Restaurant, Category } from '../types';

export default class Restaurants {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
  }

  getFilteredRestaurantsByCategory(category: Category) {
    const filteredRestaurants = this.#restaurants.filter((restaurant) => {
      return restaurant.category === category;
    });

    return filteredRestaurants;
  }

  getRestaurants() {
    return this.#restaurants;
  }
}
