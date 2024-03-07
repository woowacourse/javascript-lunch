import Restaurant from "../domain/Restaurant";
import { Icategory, Idistance, Irestaurant, IrestaurantField } from "../types";

class RestaurantStateStore {
  #restaurantState: IrestaurantField = {
    category: undefined,
    name: undefined,
    distance: undefined,
    description: undefined,
    link: undefined,
  };

  setCategory(selectCategory: Icategory) {
    this.#restaurantState.category = selectCategory;
  }

  setName(inputName: string) {
    this.#restaurantState.name = inputName;
  }

  setDistance(selectDistance: Idistance) {
    this.#restaurantState.distance = selectDistance;
  }

  setDescription(inputDescription: string | undefined) {
    this.#restaurantState.description = inputDescription;
  }

  setLink(inputLink: string | undefined) {
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
