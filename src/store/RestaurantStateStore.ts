import Restaurant from '../domain/SetRestaurant';
import { Category, Distance, RestaurantState } from '../types';

class RestaurantStateStore {
  #restaurantState: Partial<RestaurantState> = {
    category: undefined,
    name: undefined,
    distance: undefined,
    description: undefined,
    link: undefined,
  };

  resetState() {
    this.#restaurantState = {
      category: undefined,
      name: undefined,
      distance: undefined,
      description: undefined,
      link: undefined,
    };
  }

  setCategory(selectCategory: Category) {
    this.#restaurantState.category = selectCategory;
  }

  setName(inputName: string) {
    this.#restaurantState.name = inputName;
  }

  setDistance(selectDistance: Distance) {
    this.#restaurantState.distance = selectDistance;
  }

  setDescription(inputDescription: string) {
    this.#restaurantState.description = inputDescription;
  }

  setLink(inputLink: string) {
    this.#restaurantState.link = inputLink;
  }

  getRestaurantField() {
    return this.#restaurantState;
  }

  setRestaurantState() {
    return Restaurant(this.#restaurantState as RestaurantState);
  }
}

const restaurantStateStore = new RestaurantStateStore();

export default restaurantStateStore;
