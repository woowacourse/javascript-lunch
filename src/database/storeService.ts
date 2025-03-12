import { Restaurant } from '../../types/domain';
import store from './store.ts';
import { parseJSON, parseStorageKey, stringifyJSON } from '../utils/data.ts';
import { STORE } from '../constants.js';

interface StoreService {
  getRestaurants(): Restaurant[];
  findRestaurantByName(name: string): Restaurant;
  findRestaurantsByCategory(category: string): Restaurant[];
  updateRestaurantByName(name: string, data: Restaurant): void;
  updateRestaurants(dataList: Restaurant[]): void;
  deleteRestaurantByName(name: string): void;
}

const storeService: StoreService = {
  getRestaurants() {
    const keys = Object.keys(store.storage).filter((key) => {
      return key.startsWith(STORE.keyPrefix);
    });

    const restaurants = keys.map((key) => parseJSON(store.getData(key) ?? '[]'));
    return restaurants;
  },

  findRestaurantByName(name) {
    const parsedKey = parseStorageKey(STORE.keyPrefix, name);
    const target = store.getData(parsedKey) ?? '';
    return parseJSON(target);
  },

  findRestaurantsByCategory(category) {
    const restaurants = this.getRestaurants();
    return restaurants.filter((restaurant) => {
      return restaurant.category === category;
    });
  },

  updateRestaurantByName(name, data) {
    const parsedKey = parseStorageKey(STORE.keyPrefix, name);
    const stringData = stringifyJSON(data);
    store.setData(parsedKey, stringData);
  },

  updateRestaurants(dataList) {
    dataList.forEach((data) => {
      this.updateRestaurantByName(data.name, data);
    });
  },

  deleteRestaurantByName(name) {
    const parsedKey = parseStorageKey(STORE.keyPrefix, name);
    store.removeData(parsedKey);
  },
};

export default storeService;
