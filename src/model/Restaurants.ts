import type { Category, RestaurantValues } from '../types/restaurantTypes';

export default class Restaurant {
  private restaurants;

  constructor(restaurants: RestaurantValues[]) {
    this.restaurants = restaurants;
  }

  get restaurantsList() {
    return this.restaurants;
  }

  add(restaurant: RestaurantValues) {
    this.restaurants = [...this.restaurants, restaurant];
  }

  filterByCategory(category: Category | '전체'): RestaurantValues[] {
    if (category === '전체') return this.restaurants;
    return this.restaurants.filter(restaurant => restaurant.category === category);
  }

  sortByDistance(category: Category): RestaurantValues[] {
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
