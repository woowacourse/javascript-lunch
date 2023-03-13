import { STORE_RESTAURANT } from '../constants/constants';
import { INIT_RESTAURANT_DATA } from '../constants/initRestaurantData';
import { Restaurant, SortBy, Category } from '../types/Restaurant.js';

export default class RestaurantManager {
  private restaurantList: Restaurant[];
  private store: Storage;

  constructor(store: Storage) {
    this.store = store;
    const restaurantData = this.store.getItem(STORE_RESTAURANT);
    if (restaurantData === null || restaurantData.length === 0) {
      this.store.setItem(STORE_RESTAURANT, JSON.stringify(INIT_RESTAURANT_DATA));
      this.restaurantList = JSON.parse(JSON.stringify(INIT_RESTAURANT_DATA));
    } else {
      this.restaurantList = JSON.parse(restaurantData);
    }
  }

  findRestaurantData(restaurantName: string): Restaurant {
    const resultData = [...this.restaurantList].filter((data) => data.storeName === restaurantName);
    if (resultData.length !== 0) return resultData[0];
    return {} as Restaurant;
  }

  getRestaurantList(): Restaurant[] {
    const getData = this.store.getItem(STORE_RESTAURANT);
    if (getData !== null) {
      const newData = JSON.parse(getData);
      return newData;
    }
    return [];
  }

  refreshData(data: Restaurant[]) {
    const getData = this.store.getItem(STORE_RESTAURANT);

    if (getData !== null) {
      const storageData: Restaurant[] = JSON.parse(getData);
      const refreshData = storageData.map((restaurant) => restaurant.storeName);
      return data.filter((data: Restaurant) => refreshData.includes(data.storeName));
    }
    return [];
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurantList.push(restaurant);
    this.store.setItem(STORE_RESTAURANT, JSON.stringify(this.restaurantList));
  }

  filterRestaurantLists(category: Category, sortBy: SortBy) {
    const filteredList =
      category === '전체'
        ? this.restaurantList
        : this.restaurantList.filter((data) => data.category === category);

    if (sortBy === 'name') {
      filteredList.sort((data1: Restaurant, data2: Restaurant): number => {
        return data1.storeName.localeCompare(data2.storeName, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });
    } else if (sortBy === 'distance') {
      filteredList.sort(
        (data1: Restaurant, data2: Restaurant): number => data1.distance - data2.distance
      );
    }

    return filteredList;
  }

  getFavoriteList(): Restaurant[] {
    const getData = this.store.getItem(STORE_RESTAURANT);
    if (getData !== null) {
      const newData = JSON.parse(getData);
      return newData.filter((data: Restaurant) => data.favorite === true);
    }
    return [];
  }

  reverseFavorite(storeName: string) {
    const datas = this.store.getItem(STORE_RESTAURANT);
    let renderData = {};
    if (datas !== null) {
      const changedData = JSON.parse(datas).map((info: Restaurant) => {
        if (storeName === info.storeName) {
          info.favorite = !info.favorite;
          renderData = info;
        }
        return info;
      });
      this.store.setItem(STORE_RESTAURANT, JSON.stringify(changedData));
      return renderData;
    }
    return;
  }

  removeRestaurant(storeName: string): void {
    const data = this.getRestaurantList();
    this.restaurantList = data.filter((data) => {
      if (data.storeName !== storeName) return data;
    });
    this.store.setItem(STORE_RESTAURANT, JSON.stringify(this.restaurantList));
  }
}
