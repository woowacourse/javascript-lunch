import Restaurant from "../domain/SetRestaurant";
import { Icategory } from "../types/category";
import { Idistance } from "../types/distance";
import { Irestaurant } from "../types/restaurant";

class RestaurantStateStore {
  #restaurantState: Partial<Irestaurant> = {
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
