import { mockList } from '../data/mockData';
import { IRestaurant } from './RestaurantListItem';

const KEY = 'restaurants';

const RestaurantStorage = {
  get() {
    const localData = localStorage.getItem(KEY);
    if (localData !== null) {
      try {
        const parsingData = JSON.parse(localData);
        return parsingData;
      } catch (e) {
        alert('로컬 데이터 형식이 잘못되었습니다.');
        return mockList;
      }
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
