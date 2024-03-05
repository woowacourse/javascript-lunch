import { IRestaurant, TCategory, TDistance } from '../type/types';

class Restaurant {
  #category: TCategory;
  #name: string;
  #distance: TDistance;
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
}

export default Restaurant;
