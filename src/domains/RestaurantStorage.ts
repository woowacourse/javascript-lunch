import { RESTAURANT_DATA } from '../../public/restaurantData';
import { IRestaurantInfo } from '../../types/restaurants';
import { LOCAL_STORAGE_KEY } from '../constants/SETTING';

class RestaurantStorage {
  #key;
  #restaurants: IRestaurantInfo[];

  constructor() {
    this.#key = LOCAL_STORAGE_KEY;
    this.#restaurants = this.#loadData();
  }

  getAllRestaurants(): IRestaurantInfo[] {
    return [...this.#restaurants];
  }

  saveToStorage(data: IRestaurantInfo[]) {
    localStorage.setItem(this.#key, JSON.stringify(data));
  }

  updateStorage(data: IRestaurantInfo[]): void {
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
