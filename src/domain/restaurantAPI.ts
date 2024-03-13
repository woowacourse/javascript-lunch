import { RestaurantInfo } from '../types/types';

const KEY = 'restaurant';

const restaurantAPI = {
  save: (restaurant: RestaurantInfo) => {
    const json = window.localStorage.getItem(KEY);
    const existingRestaurants: RestaurantInfo[] = json ? JSON.parse(json) : [];

    const isExisting = existingRestaurants.some(
      (existingRestaurant) => existingRestaurant.name === restaurant.name
    );

    if (!isExisting) {
      window.localStorage.setItem(KEY, JSON.stringify([...existingRestaurants, restaurant]));
    } else {
      console.log(`${restaurant.name} 가 이미 존재합니다.`);
    }
  },

  load: () => {
    const json = window.localStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  }
};

export default restaurantAPI;
