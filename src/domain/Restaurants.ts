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
}

export default Restaurants;
