import type { Category, Restaurant } from '../types/restaurantTypes';
import { DEFAULT_CATEGORY } from '../constant/constant';

class Restaurants {
  private restaurants;

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
  }

  getRestaurants() {
    return this.restaurants;
  }

  add(restaurant: Restaurant) {
    this.restaurants = [...this.restaurants, restaurant];
  }

  filterByCategory(category: Category | typeof DEFAULT_CATEGORY): Restaurant[] {
    if (category === DEFAULT_CATEGORY) return this.restaurants;
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

export default Restaurants;
