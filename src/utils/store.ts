import { Restaurant } from '../types';

const store = {
  setLocalStorage(restaurants: Restaurant[]) {
    localStorage.setItem('lunch_app_restaurants', JSON.stringify(restaurants));
  },

  getLocalStorage() {
    const data = localStorage.getItem('lunch_app_restaurants');

    if (data) {
      return JSON.parse(data);
    }
  },
};

export default store;
