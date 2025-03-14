import { Restaurant } from '../../types/domain';
import store from './store.ts';
import { parseJSON, parseStorageKey, stringifyJSON } from '../utils/data.ts';
import { STORE } from '../constants/database.ts';

interface StoreService {
  getRestaurants(): Restaurant[];
  findRestaurantById(id: number): Restaurant;
  findRestaurantsByCategory(category: string): Restaurant[];
  updateRestaurantById(id: number, data: Restaurant): void;
  updateRestaurants(dataList: Restaurant[]): void;
  deleteRestaurantById(id: number): void;
  getNewRestaurantId(): number;
}

const storeService: StoreService = {
  getRestaurants() {
    const keys = Object.keys(store.storage).filter((key) => {
      return key.startsWith(STORE.keyPrefix);
    });

    const restaurants = keys.map((key) => parseJSON(store.getData(key) ?? '[]'));
    return restaurants;
  },

  findRestaurantById(id) {
    const parsedKey = parseStorageKey(STORE.keyPrefix, id);
    const target = store.getData(parsedKey) ?? '';
    return parseJSON(target);
  },

  findRestaurantsByCategory(category) {
    const restaurants = this.getRestaurants();
    return restaurants.filter((restaurant) => {
      return restaurant.category === category;
    });
  },

  updateRestaurantById(id, data) {
    const parsedKey = parseStorageKey(STORE.keyPrefix, id);
    const stringData = stringifyJSON(data);
    store.setData(parsedKey, stringData);
  },

  updateRestaurants(dataList) {
    dataList.forEach((data) => {
      this.updateRestaurantById(data.id, data);
    });
  },

  deleteRestaurantById(id) {
    const parsedKey = parseStorageKey(STORE.keyPrefix, id);
    store.removeData(parsedKey);
  },

  getNewRestaurantId() {
    const keys = Object.keys(store.storage).filter((key) => {
      return key.startsWith(STORE.keyPrefix);
    });

    return keys.length;
  },
};

export default storeService;
