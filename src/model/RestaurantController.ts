import type { Category, Restaurant } from '../types/restaurantTypes';
import { DEFAULT_CATEGORY } from '../constant/constant';

class RestaurantController {
  private _restaurantList: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    this._restaurantList = restaurants;
  }

  getRestaurants() {
    return this._restaurantList;
  }

  add(restaurant: Restaurant) {
    this._restaurantList = [...this._restaurantList, restaurant];
  }

  filterByCategory(category: Category | typeof DEFAULT_CATEGORY): Restaurant[] {
    if (category === DEFAULT_CATEGORY) return this._restaurantList;
    return this._restaurantList.filter(restaurant => restaurant.category === category);
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

export default RestaurantController;
