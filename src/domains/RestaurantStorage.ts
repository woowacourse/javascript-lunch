import { RESTAURANT_DATA } from '../../public/restaurantData';
import { RestaurantInfo } from '../../types/restaurants';
import { LOCAL_STORAGE_KEY } from '../constants/SETTING';

class RestaurantStorage {
  #key;
  #restaurants: RestaurantInfo[];

  constructor() {
    this.#key = LOCAL_STORAGE_KEY;
    this.#restaurants = this.#loadData();
  }

  getAllRestaurants(): RestaurantInfo[] {
    return [...this.#restaurants];
  }

  saveToStorage(data: RestaurantInfo[]) {
    localStorage.setItem(this.#key, JSON.stringify(data));
  }

  updateStorage(data: RestaurantInfo[]): void {
    this.#restaurants = [...data];
    localStorage.setItem(this.#key, JSON.stringify(data));
  }

  #loadData() {
    const data = localStorage.getItem(this.#key);
    const dataList = data ? JSON.parse(data) : RESTAURANT_DATA;

    this.saveToStorage(dataList);
    return dataList;
  }
}

export default RestaurantStorage;
