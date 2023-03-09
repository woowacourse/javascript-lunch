import { INIT_DATA } from '../constants/initData';
import { Restaurant, SortBy, Category } from '../types/Restaurant.js';
import Observable from '../Observable';

class RestaurantManager extends Observable {
  private restaurantList: Restaurant[];
  private filteredRestaurantList: Restaurant[];
  private isFiltered: boolean;

  constructor() {
    super();
    this.filteredRestaurantList = [];
    this.isFiltered = false;
    const restaurantData = localStorage.getItem('restaurantList');

    if (restaurantData === null || restaurantData.length === 0) {
      localStorage.setItem('restaurantList', JSON.stringify(INIT_DATA));
      this.restaurantList = JSON.parse(JSON.stringify(INIT_DATA));
    } else {
      this.restaurantList = JSON.parse(restaurantData);
    }
  }

  getRestaurantList() {
    return this.restaurantList;
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurantList.push(restaurant);
    localStorage.setItem('restaurantList', JSON.stringify(this.restaurantList));

    this.notify(this.restaurantList);
  }

  checkRestaurantListFiltered(standard: SortBy) {
    if (this.isFiltered) this.sortRestaurantList(standard, this.filteredRestaurantList);
    else this.sortRestaurantList(standard, this.restaurantList);
  }

  sortRestaurantList(standard: SortBy, restaurantList: Restaurant[]) {
    if (standard === 'name') {
      restaurantList.sort((data1: Restaurant, data2: Restaurant): number => {
        return data1.storeName.localeCompare(data2.storeName, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });
    }

    if (standard === 'distance') {
      restaurantList.sort(
        (data1: Restaurant, data2: Restaurant): number => data1.distance - data2.distance
      );
    }

    this.notify(restaurantList);
  }

  filterRestaurantList(category: Category) {
    if (category === '전체') {
      this.isFiltered = false;
      return this.notify(this.restaurantList);
    }

    this.isFiltered = true;
    this.filteredRestaurantList = this.restaurantList.filter((data) => data.category === category);

    this.notify(this.filteredRestaurantList);
  }
}

const restaurantManager = new RestaurantManager();
export default restaurantManager;
