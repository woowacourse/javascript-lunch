/* eslint-disable max-lines-per-function */
import Restaurant from "../domain/SetRestaurant";
import { Icategory } from "../types/category";
import { Idistance } from "../types/distance";
import { Irestaurant } from "../types/restaurant";

import restaurantListStateStore from "./RestaurantListStateStore";

class RestaurantStateStore {
  #restaurantState: Partial<Irestaurant> = {
    id: restaurantListStateStore.getListCount(),
    category: undefined,
    name: undefined,
    distance: undefined,
    description: undefined,
    link: undefined,
    isLike: false,
  };

  resetState() {
    this.#restaurantState = {
      id: restaurantListStateStore.getListCount(),
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
    this.#restaurantState.name = inputName.replace(/<[^>]*>?/g, "");
  }

  setDistance(selectDistance: Idistance) {
    this.#restaurantState.distance = selectDistance;
  }

  setDescription(inputDescription: string) {
    this.#restaurantState.description = inputDescription.replace(
      /<[^>]*>?/g,
      "",
    );
  }

  setLink(inputLink: string) {
    this.#restaurantState.link = inputLink.replace(/<[^>]*>?/g, "");
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
