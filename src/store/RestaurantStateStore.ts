import Restaurant from '../domain/SetRestaurant';
import { Icategory, Idistance, Irestaurant, MappedType } from '../types';

class RestaurantStateStore {
  #restaurantState: MappedType<Irestaurant> = {
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

  setCategory(selectCategory: Icategory) {
    this.#restaurantState.category = selectCategory;
  }

  setName(inputName: string) {
    this.#restaurantState.name = inputName;
  }

  setDistance(selectDistance: Idistance) {
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
    return Restaurant(this.#restaurantState as Irestaurant);
  }
}

const restaurantStateStore = new RestaurantStateStore();

export default restaurantStateStore;
