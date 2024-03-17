import { LOCAL_STORAGE_KEY } from '../../constant/constants';
import { DUMMY } from '../../constant/dummy';
import RestaurantEntity from '../../domain/entities/RestaurantEntity';
import { Restaurant } from '../../interface/RestaurantInterfaces';
class RestaurantList {
  #restaurantList: Restaurant[];

  constructor() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DUMMY));

    const storageData = this.fetchData();
    this.#restaurantList = Array.from(storageData, item => new RestaurantEntity({ restaurant: item }));
  }

  fetchData(): Restaurant[] {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  }

  updateData() {
    const storageData = this.fetchData();
    if (storageData) {
      this.#restaurantList = Array.from(storageData, item => new RestaurantEntity({ restaurant: item }));
    }
  }

  get list() {
    return this.#restaurantList;
  }

  set list(listData: Restaurant[]) {
    this.#restaurantList = listData;
  }
}

export default RestaurantList;
