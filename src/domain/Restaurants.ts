import { Restaurant, Category, RestaurantSortType } from '../types';
import store from '../utils/store';

export default class Restaurants {
  #restaurants: Restaurant[];

  constructor(data = []) {
    this.#restaurants = data;
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
    store.setLocalStorage(this.#restaurants);
  }

  getFilteredRestaurantsByCategory(category: Category) {
    if (category === '전체') {
      return this.#restaurants;
    }

    return this.#restaurants.filter((restaurant) => {
      return restaurant.category === category;
    });
  }

  getSortedRestaurants(filterdRestaurants: Restaurant[], sortOption: RestaurantSortType) {
    if (sortOption === 'name') {
      return this.getSortedRestaurantsByName(filterdRestaurants);
    }

    return this.getSortedRestaurantsByDistance(filterdRestaurants);
  }

  getSortedRestaurantsByName(restaurants: Restaurant[]) {
    const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
      return restaurant1.name.localeCompare(restaurant2.name);
    });

    return sortedRestaurants;
  }

  getSortedRestaurantsByDistance(restaurants: Restaurant[]) {
    const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
      return Number(restaurant1.distance) - Number(restaurant2.distance);
    });

    return sortedRestaurants;
  }

  getRestaurants() {
    return this.#restaurants;
  }
}
