import { Restaurant } from '../../types/domain';
import store from './store.ts';
import { parseJSON, stringifyJSON } from '../utils/data.ts';

interface StoreService {
  getRestaurants(): Restaurant[];
  findRestaurantByName(name: string): Restaurant;
  findRestaurantsByCategory(category: string): Restaurant[];
  updateRestaurantByName(name: string, data: Restaurant): void;
  deleteRestaurantByName(name: string): void;
}

const storeService: StoreService = {
  getRestaurants() {
    const keys = Object.keys(store.storage);
    return keys.map((key) => parseJSON(store.getData(key) ?? '[]'));
  },

  findRestaurantByName(name) {
    const target = store.getData(name) ?? '';
    return parseJSON(target);
  },

  findRestaurantsByCategory(category) {
    const restaurants = this.getRestaurants();
    return restaurants.filter((restaurant) => {
      return restaurant.category === category;
    });
  },

  updateRestaurantByName(name, data) {
    const stringData = stringifyJSON(data);
    store.setData(name, stringData);
  },

  deleteRestaurantByName(name) {
    store.removeData(name);
  },
};

export default storeService;
