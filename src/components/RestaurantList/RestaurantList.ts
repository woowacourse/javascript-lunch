import { LOCAL_STORAGE_KEY } from '../../constant/constants';
import { DUMMY } from '../../constant/dummy';
import RestaurantEntity from '../../domain/entities/RestaurantEntity';
import { Restaurant } from '../../interface/RestaurantInterfaces';

class RestaurantList {
  #restaurantList;

  constructor() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DUMMY));

    const storageData = this.fetchData();
    if (storageData) {
      this.#restaurantList = Array.from(storageData, item => new RestaurantEntity({ restaurant: item }));
    }
  }

  fetchData(): Restaurant[] {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storage ? JSON.parse(storage) : [];
  }

  updateData() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.#restaurantList));
  }

  get list() {
    return this.#restaurantList;
  }
}

export default RestaurantList;
