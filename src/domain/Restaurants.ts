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

  getSortedRestaurantsByName() {
    const sortedRestaurants = this.#restaurants.sort((restaurant1, restaurant2) => {
      return restaurant1.name.localeCompare(restaurant2.name);
    });

    return sortedRestaurants;
  }

  getSortedRestaurantsByDistance() {
    const sortedRestaurants = this.#restaurants.sort((restaurant1, restaurant2) => {
      return Number(restaurant1.distance) - Number(restaurant2.distance);
    });

    return sortedRestaurants;
  }

  getRestaurants() {
    return this.#restaurants;
  }
}
