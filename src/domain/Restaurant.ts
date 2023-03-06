import { CategoryOptions, DistanceTime } from '../types/type';

export interface IRestaurant {
  category: CategoryOptions;
  distance: DistanceTime;
  name: string;
  description?: string;
  URLlink?: string;
}

export class Restaurant {
  #state: IRestaurant;

  constructor(restaurant: IRestaurant) {
    this.#state = { ...restaurant };
  }

  getRestaurantInfo() {
    return { ...this.#state };
  }

  compareName(otherRestaurant: Restaurant) {
    return this.#state.name.localeCompare(otherRestaurant.#state.name);
  }

  compareDistance(otherRestaurant: Restaurant) {
    return this.#state.distance - otherRestaurant.#state.distance;
  }

  isSameCategory(category: CategoryOptions) {
    return this.#state.category === category;
  }
}
