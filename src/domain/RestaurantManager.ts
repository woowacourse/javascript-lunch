import getUniqueID from '../utils/getUniqueID';
import { Category, FilterOptions, Option, Restaurant } from './types';

export default class RestaurantManager {
  private restaurants: Restaurant[] = [];

  constructor(restaurants: Restaurant[] = []) {
    this.restaurants = restaurants;
  }

  add(restaurant: Omit<Restaurant, 'id' | 'isBookmark'>): void {
    this.restaurants.push({ id: getUniqueID(), isBookmark: false, ...restaurant });
  }

  delete(id: number): void {
    this.restaurants = this.restaurants.filter((restaurant) => restaurant.id !== id);
  }

  update(updatedRestaurant: Restaurant): void {
    const index = this.restaurants.findIndex((restaurant) => restaurant.id === updatedRestaurant.id);
    if (index !== -1) {
      this.restaurants[index] = updatedRestaurant;
    }
  }

  getFilteredList(options: FilterOptions, isBookmark: boolean): Restaurant[] {
    const restaurants = this.filterByBookmark(this.restaurants, isBookmark);
    const filteredRestaurants = this.filterByCategory(restaurants, options.category);

    return this.sortByOption(filteredRestaurants, options.sort);
  }

  private filterByBookmark(restaurants: Restaurant[], isBookmark: boolean): Restaurant[] {
    if (isBookmark) {
      return this.restaurants.filter((restaurant) => restaurant.isBookmark);
    }
    return restaurants;
  }

  private filterByCategory(restaurants: Restaurant[], category: Category): Restaurant[] {
    if (category === '전체') {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  private sortByOption(restaurants: Restaurant[], sort: Option): Restaurant[] {
    if (sort === 'name') {
      return restaurants.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === 'distance') {
      return restaurants.sort((a, b) => a.distance - b.distance);
    }
    return restaurants;
  }
}
