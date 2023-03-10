import type { Category, Restaurant } from '../types/restaurantTypes';
import { DEFAULT_CATEGORY } from '../constant/constant';

class RestaurantController {
  private _restaurantList: Restaurant[];
  private _nextId: number;

  constructor(restaurants: Restaurant[]) {
    this._restaurantList = restaurants;
    this._nextId = restaurants.length + 1;
  }

  getRestaurants() {
    return this._restaurantList;
  }

  add(restaurant: Restaurant) {
    const newRestaurant = { ...restaurant, id: this._nextId++ };
    this._restaurantList = [...this._restaurantList, newRestaurant];
  }

  deleteById(id: number) {
    this._restaurantList = this._restaurantList.filter(restaurant => restaurant.id !== id);
  }

  filterByLiked() {
    return this._restaurantList.filter(restaurant => restaurant.isLike);
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
