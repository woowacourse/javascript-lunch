import type { IRestaurantList } from '../types/restaurant';

import Restaurant from './Restaurant';
import { STORAGE_KEY } from '../constants/config';

const RestaurantStorage = {
  get(key: typeof STORAGE_KEY) {
    const restaurantsInStorage = localStorage.getItem(key);

    if (restaurantsInStorage !== null) {
      const restaurants: IRestaurantList = JSON.parse(restaurantsInStorage);
      return restaurants.map(parsedRestaurant => new Restaurant(parsedRestaurant.information));
    }

    return [];
  },
  set(value: IRestaurantList) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  },
};

export default RestaurantStorage;
