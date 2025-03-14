import { Restaurant } from '../types/types';

class Restaurants {
  #restaurants: Restaurant[];

  constructor() {
    const localRestaurants = localStorage.getItem('restaurants');
    this.#restaurants = localRestaurants ? (JSON.parse(localRestaurants) as Restaurant[]) : [];
  }

  get items(): Restaurant[] {
    return [...this.#restaurants];
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
    localStorage.setItem('restaurants', JSON.stringify(this.#restaurants));
  }
}

export default Restaurants;
