import { STORAGE_KEY } from '../constants/config';
import type { IRestaurantList, TRestaurantInstance } from '../types/restaurant';
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

  setMatchedRestaurant(restaurant: TRestaurantInstance): void {
    const localStorageRestaurants = this.getRestaurants();

    localStorageRestaurants.forEach((localStorageRestaurant, index) => {
      if (localStorageRestaurant.information.name === restaurant.information.name) {
        localStorageRestaurants[index] = restaurant;
      }
    });

    this.setRestaurants(localStorageRestaurants);
  },

  getMatchedRestaurant(name: string): TRestaurantInstance | undefined {
    const localStorageRestaurants = this.getRestaurants();

    const matchedRestaurant = localStorageRestaurants.find(
      localStorageRestaurant => localStorageRestaurant.information.name === name,
    );

    return matchedRestaurant;
  },
};

export default RestaurantsStorage;
