import { STORAGE_KEY } from '../constants/config';
import type { IRestaurantList } from '../types/restaurant';
import Restaurant from './Restaurant';

const LocalStorage = {
  setStorageRestaurantList(restaurants: IRestaurantList): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
  },

  getStorageRestaurantList(restaurantsInStorage: string): IRestaurantList {
    const parsedRestaurantList: IRestaurantList = JSON.parse(restaurantsInStorage);
    return parsedRestaurantList.map(parsedRestaurant => new Restaurant(parsedRestaurant.information));
  },
};

export default LocalStorage;
