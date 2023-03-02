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

  sortRestaurantList(standard: SortBy) {
    const restaurantData = localStorage.getItem('restaurantList');

    if (restaurantData !== null && standard === '이름순') {
      const restaurantList: Restaurant[] = JSON.parse(restaurantData);
      restaurantList.sort((data1: Restaurant, data2: Restaurant): number => {
        return data1.storeName.localeCompare(data2.storeName, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });
    }

    if (restaurantData !== null && standard === '거리순') {
      const restaurantList: Restaurant[] = JSON.parse(restaurantData);
      restaurantList.sort(
        (data1: Restaurant, data2: Restaurant): number => data1.distance - data2.distance
      );
    }
  }

  filterRestaurantList(category: Category): Restaurant[] {
    const restaurantData = localStorage.getItem('restaurantList');

    if (restaurantData !== null) {
      const restaurantList: Restaurant[] = JSON.parse(restaurantData);
      return restaurantList.filter((data) => data.category === category);
    }

    return [];
  }
}
