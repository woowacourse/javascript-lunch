import { LOCAL_STORAGE_KEY } from '../../constant/constants';
import { Restaurant } from '../../interface/RestaurantInterfaces';

const RestaurantStore = {
  store(restaurantList: Restaurant[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(restaurantList));
  },

  fetch(): Restaurant[] {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  },
};

export default RestaurantStore;
