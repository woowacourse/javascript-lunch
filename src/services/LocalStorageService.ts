import { RestaurantInfo } from '../types';

const LocalStorageService = {
  setData(key: string, data: RestaurantInfo[]) {
    window.localStorage.setItem(key, JSON.stringify(data));
  },

  getData(key: string) {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
};

export default LocalStorageService;
