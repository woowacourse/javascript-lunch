import { RestaurantInfo } from '../types/types';

const KEY = 'restaurant';

const restaurantAPI = {
  save: (restaurant: RestaurantInfo) => {
    const json = window.localStorage.getItem(KEY);
    const existingRestaurants = json ? JSON.parse(json) : [];
    window.localStorage.setItem(KEY, JSON.stringify([...existingRestaurants, restaurant]));
  },

  load: () => {
    const json = window.localStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  }
};

export default restaurantAPI;
