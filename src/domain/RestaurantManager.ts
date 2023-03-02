import RestaurantInfo from './RestaurantInfo';
import { INIT_DATA } from '../constants/initData';
import { Restaurant, SortBy, Category } from '../types/Restaurant.js';

export default class RestaurantManager {
  private restaurantList: Restaurant[];

  constructor() {
    const restaurantData = localStorage.getItem('restaurantList');
    if (restaurantData === null || restaurantData.length === 0) {
      localStorage.setItem('restaurantList', JSON.stringify(INIT_DATA));
      this.restaurantList = JSON.parse(JSON.stringify(INIT_DATA));
    } else {
      this.restaurantList = JSON.parse(restaurantData);
    }
  }

  getRestaurantList(): Restaurant[] {
    return [...this.restaurantList];
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurantList.push(restaurant);
    localStorage.setItem('restaurantList', JSON.stringify(this.restaurantList));
  }

  sortRestaurantList(standard: SortBy): Restaurant[] {
    if (standard === 'name') {
      this.restaurantList.sort((data1: Restaurant, data2: Restaurant): number => {
        return data1.storeName.localeCompare(data2.storeName, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });
    }

    if (standard === 'distance') {
      this.restaurantList.sort(
        (data1: Restaurant, data2: Restaurant): number => data1.distance - data2.distance
      );
    }
    return this.restaurantList;
  }

  filterRestaurantList(category: Category): Restaurant[] {
    return this.restaurantList.filter((data) => data.category === category);
  }
}
