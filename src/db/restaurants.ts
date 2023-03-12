import { Restaurant, Restaurants } from './../types';
import { v4 as uuid } from 'uuid';

const key = 'store';

const db = {
  setRestaurants(restaurants: Restaurants) {
    return localStorage.setItem(key, JSON.stringify(restaurants));
  },

  getRestaurants(): Restaurants {
    return {
      ...JSON.parse(localStorage.getItem(key) || '{}'),
    };
  },

  addRestaurant(restaurant: Restaurant) {
    return localStorage.setItem(
      key,
      JSON.stringify({
        [uuid()]: restaurant,
        ...JSON.parse(localStorage.getItem(key) || '{}'),
      }),
    );
  },
};

export default db;
