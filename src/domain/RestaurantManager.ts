import RestaurantInfo from './RestaurantInfo';
import { INIT_DATA } from '../constants/initData';
import { Restaurant, SortBy, Category } from '../types/Restaurant.js';

export default class RestaurantManager {
  initRestaurantList() {
    if (localStorage.getItem('restaurantList')?.length === 0) {
      localStorage.setItem('restaurantList', JSON.stringify(INIT_DATA));
    }
  }

  addRestaurant(restaurant: Restaurant) {
    const restaurantData = localStorage.getItem('restaurantList');

    if (restaurantData !== null) {
      const restaurantList: Restaurant[] = JSON.parse(restaurantData);
      restaurantList.push(restaurant);

      localStorage.setItem('restaurantList', JSON.stringify(restaurantList));
    }
  }
}
