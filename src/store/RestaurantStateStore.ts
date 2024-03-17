/* eslint-disable max-lines-per-function */
import { REMOVE_INNER_TAG } from "../constants/system";
import Restaurant from "../domain/SetRestaurant";
import { Icategory } from "../types/category";
import { Idistance } from "../types/distance";
import { Irestaurant } from "../types/restaurant";

import restaurantListStateStore from "./RestaurantListStateStore";

class RestaurantStateStore {
  #restaurantState: Partial<Irestaurant> = {
    id: restaurantListStateStore.getIdNumber(),
    category: undefined,
    name: undefined,
    distance: undefined,
    description: undefined,
    link: undefined,
    isLike: false,
  };

  resetState() {
    this.#restaurantState = {
      id: restaurantListStateStore.getIdNumber(),
      category: undefined,
      name: undefined,
      distance: undefined,
      description: undefined,
      link: undefined,
      isLike: false,
    };
  }

  setCategory(selectCategory: Icategory) {
    this.#restaurantState.category = selectCategory;
  }

  setName(inputName: string) {
    this.#restaurantState.name = inputName.replace(REMOVE_INNER_TAG, "");
  }

  setDistance(selectDistance: Idistance) {
    this.#restaurantState.distance = selectDistance;
  }

  setDescription(inputDescription: string) {
    this.#restaurantState.description = inputDescription.replace(
      REMOVE_INNER_TAG,
      "",
    );
  }

  setLink(inputLink: string) {
    this.#restaurantState.link = inputLink.replace(REMOVE_INNER_TAG, "");
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
