import { Restaurant } from '../../types/domain';

interface Cache {
  restaurants: Restaurant[];
  getRestaurants(): Restaurant[];
  setRestaurants(restaurants: Restaurant[]): void;
  clearRestaurants(): void;
}

const cache: Cache = {
  restaurants: [],

  getRestaurants() {
    return this.restaurants;
  },

  setRestaurants(restaurants) {
    this.restaurants = restaurants;
  },

  clearRestaurants() {
    this.restaurants = [];
  },
};

export default cache;
