import { IRestaurant } from '../type/types';

class Restaurant {
  #category: string;
  #name: string;
  #distance: number;
  #description?: string;
  #reference?: string;

  constructor(data: IRestaurant) {
    const { category, name, distance, description, reference } = data;

    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description ?? '';
    this.#reference = reference ?? '';
  }

  getCategory() {
    return this.#category;
  }

  getName() {
    return this.#name;
  }

  getDistance() {
    return this.#distance;
  }
}

export default Restaurant;
