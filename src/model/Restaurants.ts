import type { Category, Restaurant } from '../types/restaurantTypes';

export default class Restaurants {
  private restaurants;

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
  }

  get restaurantsList() {
    return this.restaurants;
  }

  add(restaurant: Restaurant) {
    this.restaurants = [...this.restaurants, restaurant];
  }

  filterByCategory(category: Category | '전체'): Restaurant[] {
    if (category === '전체') return this.restaurants;
    return this.restaurants.filter(restaurant => restaurant.category === category);
  }

  sortByDistance(category: Category): Restaurant[] {
    return this.filterByCategory(category).sort(
      (firstElement, secondElement) => firstElement.distance - secondElement.distance
    );
  }

  sortByName(category: Category) {
    return this.filterByCategory(category).sort((firstElement, secondElement) =>
      firstElement.name > secondElement.name ? 1 : -1
    );
  }
}
