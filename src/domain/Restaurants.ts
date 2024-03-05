import { IRestaurant, TCategory } from '../type/types';
import Restaurant from './Restaurant';

class Restaurants {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
  }

  getFilteredByCategory(category: TCategory) {
    return [...this.#restaurants.filter((restaurant) => restaurant.getCategory() === category)];
  }

  getSortedByName() {
    return this.#restaurants.sort((a, b) => a.getName() - b.getName());
  }
}

export default Restaurants;
