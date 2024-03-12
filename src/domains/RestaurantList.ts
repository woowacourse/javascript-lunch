import { STORAGE_KEY } from '../constants';
import { INITIAL_RESTAURANT_DATA } from '../data/restaurantData';
import { Category, RestaurantInfo } from '../types';
import { getDeepCopiedArray } from '../utils';

class RestaurantList {
  #list: RestaurantInfo[] = INITIAL_RESTAURANT_DATA;

  constructor() {
    this.#updateListByLocalStorage();
    this.#list = this.sortRestaurants(this.#list, 'name');
  }

  get list() {
    return getDeepCopiedArray(this.#list);
  }

  addRestaurant(info: RestaurantInfo) {
    if (!this.#list) {
      this.#list = [info];
      return;
    }

    this.#list.push(info);

    localStorage.setItem(STORAGE_KEY.restaurants, JSON.stringify(this.#list));
  }

  #updateListByLocalStorage() {
    const item = localStorage.getItem(STORAGE_KEY.restaurants);
    if (item) {
      this.#list = JSON.parse(item);
    }
  }

  //  2단계 - 즐겨찾기 편집 추가
  filterRestaurantsByCategory(
    category: Category,
  ): RestaurantInfo[] | undefined {
    return this.#list
      ? getDeepCopiedArray(this.#list).filter(
          (info: RestaurantInfo) => info.category === category,
        )
      : undefined;
  }

  sortRestaurants(
    restaurants: RestaurantInfo[],
    sorting: 'name' | 'distance',
  ): RestaurantInfo[] {
    return getDeepCopiedArray(restaurants).sort((prev, current) => {
      if (sorting === 'distance') {
        return prev.distance - current.distance;
      }
      return prev.name.localeCompare(current.name);
    });
  }
}

export default RestaurantList;
