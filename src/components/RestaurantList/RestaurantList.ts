import { LOCAL_STORAGE_KEY } from '../../constant/constants';
import { Restaurant } from '../../interface/RestaurantInterfaces';
import RestaurantEntity from '../../domain/entities/RestaurantEntity';
class RestaurantList {
  #restaurantList: Restaurant[];

  constructor() {
    const storageData = this.fetchData();
    this.#restaurantList = Array.from(storageData, item => new RestaurantEntity({ restaurant: item }));
  }

  fetchData(): Restaurant[] {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  }

  updateData() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.#restaurantList));
  }

  get list() {
    return this.#restaurantList;
  }

  set list(listData: Restaurant[]) {
    this.#restaurantList = listData;
  }
}

export default RestaurantList;
