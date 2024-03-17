import getUniqueID from '../utils/getUniqueID';
import { filterByBookmark, filterByCategory, sortByOption } from './RestaurantFilters';
import { FilterOptions, Restaurant } from './types';

export default class RestaurantManager {
  #restaurants: Restaurant[] = [];

  constructor(restaurants: Restaurant[] = []) {
    this.#restaurants = [...restaurants];
  }

  add(restaurant: Omit<Restaurant, 'id' | 'isBookmark'>): void {
    this.#restaurants.push({ id: getUniqueID(), isBookmark: false, ...restaurant });
  }

  delete(id: number): void {
    this.#restaurants = this.#restaurants.filter((restaurant) => restaurant.id !== id);
  }

  update(updatedRestaurant: Restaurant): void {
    const index = this.#restaurants.findIndex((restaurant) => restaurant.id === updatedRestaurant.id);
    if (index !== -1) {
      this.#restaurants[index] = updatedRestaurant;
    }
  }

  getFilteredList(options: FilterOptions, isBookmark: boolean): Restaurant[] {
    const restaurants = filterByBookmark(this.#restaurants, isBookmark);
    const filteredRestaurants = filterByCategory(restaurants, options.category);
    return sortByOption(filteredRestaurants, options.sort);
  }
}
