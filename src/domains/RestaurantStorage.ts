import { RESTAURANT_DATA } from '../../public/restaurantData';
import { IRestaurantInfo } from '../../types/restaurants';

class RestaurantStorage {
  #key;
  #restaurants: IRestaurantInfo[];

  constructor() {
    this.#key = 'restaurant';
    this.#restaurants = this.#loadData();
    console.log(this.#restaurants);
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
