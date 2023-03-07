import { Restaurant } from '../type';

const restaurantsStorage = {
  KEY: 'restaurants',

  getRestaurants(): Restaurant[] {
    return JSON.parse(localStorage.getItem(restaurantsStorage.KEY) ?? '[]');
  },

  setRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem(restaurantsStorage.KEY, JSON.stringify(restaurants));
  },
};

export default restaurantsStorage;
