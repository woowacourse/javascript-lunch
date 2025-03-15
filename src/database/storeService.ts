import { Restaurant } from '../../types/domain';
import store from './store.ts';
import { parseJSON, stringifyJSON } from '../utils/data.ts';
import { STORE } from '../constants/database.ts';

interface StoreService {
  getRestaurants(): Restaurant[];
  findRestaurantById(id: number): Restaurant;
  updateRestaurantById(id: number, data: Restaurant): void;
  updateRestaurants(dataList: Restaurant[]): void;
  deleteRestaurantById(id: number): void;
  getNewRestaurantId(): number;
}

const storeService: StoreService = {
  getRestaurants() {
    return parseJSON(store.getData(STORE.restaurantsKey) ?? '[]');
  },

  findRestaurantById(id) {
    const totalRestaurants = this.getRestaurants();
    const target = totalRestaurants.find((restaurant) => restaurant.id === id);
    if (!target) {
      throw new Error('음식점 정보가 없습니다. id를 확인해주세요.');
    }

    return target;
  },

  updateRestaurantById(id, data) {
    const totalRestaurants = this.getRestaurants();
    const maintainedRestaurants = totalRestaurants.filter((restaurant) => {
      return restaurant.id !== id;
    });

    const newRestaurants = [...maintainedRestaurants, data];
    const stringData = stringifyJSON(newRestaurants);

    store.setData(STORE.restaurantsKey, stringData);
  },

  updateRestaurants(dataList) {
    dataList.forEach((data) => {
      this.updateRestaurantById(data.id, data);
    });
  },

  deleteRestaurantById(id) {
    const totalRestaurants = this.getRestaurants();
    const maintainedRestaurants = totalRestaurants.filter((restaurant) => {
      return restaurant.id !== id;
    });

    const stringData = stringifyJSON(maintainedRestaurants);

    store.setData(STORE.restaurantsKey, stringData);
  },

  getNewRestaurantId() {
    const totalRestaurants = this.getRestaurants();
    return totalRestaurants.length;
  },
};

export default storeService;
