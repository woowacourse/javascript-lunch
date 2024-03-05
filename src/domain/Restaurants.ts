import Restaurant from './Restaurant';
import { TCategory } from '../type/types';

class Restaurants {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
  }

  getFilteredByCategory(category: TCategory) {
    return [...this.#restaurants.filter((restaurant) => restaurant.category === category)];
  }

  getSortedByName() {
    return [...this.#restaurants.sort((a, b) => a.name.localeCompare(b.name))];
  }

  getSortedByDistance() {
    return [...this.#restaurants.sort((a, b) => a.distance - b.distance)];
  }
}

export default Restaurants;
