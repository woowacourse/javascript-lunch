import { IRestaurant } from '../types';

import deepCopy from '../utils/deepCopy';

export default class Restaurants {
  #restaurants: IRestaurant[];

  constructor(data: IRestaurant[] = []) {
    this.#restaurants = data;
  }

  addRestaurant(restaurant: IRestaurant) {
    this.#restaurants.push(restaurant);
  }

  getRestaurants() {
    return deepCopy(this.#restaurants);
  }
}
