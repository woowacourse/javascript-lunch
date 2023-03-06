import mockList from '../data/mockRestaurant';
import { IRestaurant } from './RestaurantListItem';

const KEY = 'restaurants';

const RestaurantStorage = {
  get() {
    const localData = localStorage.getItem(KEY);
    if (localData !== null) {
      return JSON.parse(localData);
    }
    return mockList;
  },
  set(value: IRestaurant[]) {
    localStorage.setItem(KEY, JSON.stringify(value));
  },
  clear() {
    localStorage.clear();
  },
};

export default RestaurantStorage;
