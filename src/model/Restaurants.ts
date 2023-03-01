import type { Category, Restaurant } from '../types/restaurantTypes';

class Restaurants {
  #restaurants;

  constructor(restaurants: Restaurant[]) {
    this.#restaurants = restaurants;
  }

  getRestaurants() {
    return this.#restaurants;
  }

  add(restaurant: Restaurant) {
    this.#restaurants = [...this.#restaurants, restaurant];
  }

  sortByName() {
    return this.#restaurants.sort((firstElement, secondElement) => (firstElement.name > secondElement.name ? 1 : -1));
  }

  filterByCategory(category: Category): Restaurant[] {
    return this.#restaurants.filter(restaurant => restaurant.category === category);
  }

  sortByDistance(): Restaurant[] {
    return this.#restaurants.sort((firstElement, secondElement) => firstElement.distance - secondElement.distance);
  }
}

export default Restaurants;
