import { StorageKeyEnum, MESSAGE } from '../constants';
import { INITIAL_RESTAURANT_DATA } from '../data/restaurantData';
import { Category, RestaurantInfo } from '../types';

class RestaurantList {
  #list: RestaurantInfo[] = INITIAL_RESTAURANT_DATA;

  constructor() {
    this.#updateListByLocalStorage();
    this.#list = this.sortRestaurants(this.#list, 'name');
  }

  get list() {
    return JSON.parse(JSON.stringify(this.#list)) as RestaurantInfo[];
  }

  addRestaurant(info: RestaurantInfo) {
    this.#checkDuplicate(info.name);

    if (!this.#list) {
      this.#list = [info];
      return;
    }

    this.#list.push(info);
  }

  #updateListByLocalStorage() {
    const item = localStorage.getItem(StorageKeyEnum.restaurants);
    if (item) {
      this.#list = JSON.parse(item);
    }
  }

  #checkDuplicate(name: string) {
    if (!this.#list?.every((info: RestaurantInfo) => info.name !== name)) {
      throw new Error(MESSAGE.duplicateRestaurantName);
    }
  }
  //2단계 - 즐겨찾기 편집
  filterRestaurantsByLike(like: Boolean) {
    return this.#list
      ? JSON.parse(JSON.stringify(this.#list)).filter(
          (info: RestaurantInfo) => info.like === like,
        )
      : undefined;
  }

  filterRestaurantsByCategory(
    restaurants: RestaurantInfo[],
    category: Category,
  ) {
    return this.#list
      ? restaurants.filter((info: RestaurantInfo) => info.category === category)
      : undefined;
  }

  sortRestaurants(restaurants: RestaurantInfo[], sorting: 'name' | 'distance') {
    return restaurants.sort((prev, current) => {
      if (sorting === 'distance') {
        return prev.distance - current.distance;
      }
      return prev.name.localeCompare(current.name);
    });
  }
}

export default RestaurantList;
