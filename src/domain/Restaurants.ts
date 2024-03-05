import { IRestaurant } from '../type/types';

class Restaurants {
  #restaurants: IRestaurant[];

  constructor() {
    this.#restaurants = [];
  }

  addRestaurant(restaurant: IRestaurant) {
    this.#restaurants.push(restaurant);
  }
}

export default Restaurants;
