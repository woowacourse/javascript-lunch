import { INIT_DATA } from '../constants/initData';
import { Restaurant, SortBy, Category } from '../types/Restaurant.js';
import Observable from '../Observable';

class RestaurantManager extends Observable {
  private restaurantList: Restaurant[];
  private filteredRestaurantLitst: Restaurant[];

  constructor() {
    super();
    this.filteredRestaurantLitst = [];

    const restaurantData = localStorage.getItem('restaurantList');

    if (restaurantData === null || restaurantData.length === 0) {
      localStorage.setItem('restaurantList', JSON.stringify(INIT_DATA));
      this.restaurantList = JSON.parse(JSON.stringify(INIT_DATA));
    } else {
      this.restaurantList = JSON.parse(restaurantData);
    }
  }

  getRestaurantList(): Restaurant[] {
    return this.restaurantList;
  }

  getFilterRestaurantList(): Restaurant[] {
    return this.filteredRestaurantLitst;
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurantList.push(restaurant);
    localStorage.setItem('restaurantList', JSON.stringify(this.restaurantList));

    this.notify();
  }

  sortRestaurantList(standard: SortBy) {
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

    this.notify();
  }

  filterRestaurantList(category: Category) {
    this.filteredRestaurantLitst = this.restaurantList.filter((data) => data.category === category);

    this.notify();
  }
}

const restaurantManager = new RestaurantManager();
export default restaurantManager;
