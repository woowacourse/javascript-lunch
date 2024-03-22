import { STORAGE_KEY } from '../constants/config';
import type { IRestaurantList } from '../types/restaurant';
import Restaurant from './Restaurant';

const RestaurantsStorage = {
  setRestaurants(restaurants: IRestaurantList): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
  },

  getRestaurants(): IRestaurantList {
    const restaurantsInStorage = localStorage.getItem(STORAGE_KEY);
    if (restaurantsInStorage != null) {
      const parsedRestaurantList: IRestaurantList = JSON.parse(restaurantsInStorage);
      return parsedRestaurantList.map(parsedRestaurant => new Restaurant(parsedRestaurant.information));
    }
    return Array(0);
  },
};

export default RestaurantsStorage;
