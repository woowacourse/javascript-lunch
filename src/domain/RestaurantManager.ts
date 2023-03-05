import { INIT_RESTAURANT_DATA } from '../constants/initRestaurantData';
import { Restaurant, SortBy, Category } from '../types/Restaurant.js';

export default class RestaurantManager {
  private restaurantList: Restaurant[];
  private store: Storage;

  constructor(store: Storage) {
    this.store = store;
    const restaurantData = this.store.getItem('restaurantList');
    if (restaurantData === null || restaurantData.length === 0) {
      this.store.setItem('restaurantList', JSON.stringify(INIT_RESTAURANT_DATA));
      this.restaurantList = JSON.parse(JSON.stringify(INIT_RESTAURANT_DATA));
    } else {
      this.restaurantList = JSON.parse(restaurantData);
    }
  }

  getRestaurantList(): Restaurant[] {
    return [...this.restaurantList];
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurantList.push(restaurant);
    this.store.setItem('restaurantList', JSON.stringify(this.restaurantList));
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
