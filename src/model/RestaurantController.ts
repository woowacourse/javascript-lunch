import type { Category, Restaurant } from '../types/restaurantTypes';
import { DEFAULT_CATEGORY, SORTING_OPTION } from '../constant/constant';

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

  filterByCategory(category: Category | null): Restaurant[] {
    if (category === (DEFAULT_CATEGORY as Category)) return this._restaurantList;
    return this._restaurantList.filter(restaurant => restaurant.category === category);
  }

  sortRestaurants(category: Category, sortingOption: string) {
    return this.filterByCategory(category).sort((firstElement, secondElement) => {
      if (sortingOption === SORTING_OPTION.NAME) {
        return firstElement.name.localeCompare(secondElement.name);
      }
      if (sortingOption === SORTING_OPTION.DISTANCE) {
        return firstElement.distance - secondElement.distance;
      }
      return 0;
    });
  }
}

export default RestaurantController;
