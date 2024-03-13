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

    this.#saveListToLocalStore();
  }

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

  changeFavorite(storeName: string) {
    const storeIndex = this.#list.findIndex((info) => info.name === storeName);
    const targetStore = this.#list[storeIndex];
    this.#list.splice(storeIndex, 1, {
      ...targetStore,
      favorite: !targetStore.favorite,
    });

    this.#saveListToLocalStore();
  }

  deleteStore(storeName: string) {
    const storeIndex = this.#list.findIndex((info) => info.name === storeName);

    this.#list.splice(storeIndex, 1);
    this.#saveListToLocalStore();
  }
  // 어디서 RestaurantList를 불러와도 서버(=localStorage)와 데이터를 동기화
  // 1, 서버에 저장

  #saveListToLocalStore() {
    localStorage.setItem(STORAGE_KEY.restaurants, JSON.stringify(this.#list));
  }

  // 2. 서버의 데이터와 동기화
  #updateListByLocalStorage() {
    const item = localStorage.getItem(STORAGE_KEY.restaurants);
    if (item) {
      this.#list = JSON.parse(item);
    }
  }
}

export default RestaurantList;
