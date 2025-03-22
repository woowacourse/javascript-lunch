import { ERROR_MESSAGE } from "../constants/error";
import { validateEmpty } from "../validate/validateEmpty";

import { RestaurantValue } from "./types";

class Restaurant {
  readonly #value: RestaurantValue;

  constructor({
    category,
    name,
    distance,
    description,
    link,
    isFavorite = false,
  }: RestaurantValue) {
    this.#value = { category, name, distance, description, link, isFavorite };
    this.#validate();
  }

  #validate() {
    validateEmpty(this.#value.category, ERROR_MESSAGE.CATEGORY_FIELD_REQUIRED);
    validateEmpty(this.#value.name, ERROR_MESSAGE.NAME_FIELD_REQUIRED);
    validateEmpty(this.#value.distance, ERROR_MESSAGE.DISTANCE_FIELD_REQUIRED);
  }

  static of(value: RestaurantValue) {
    return new Restaurant(value);
  }

  toggleFavorite() {
    this.#value.isFavorite = !this.#value.isFavorite;
  }

  get value() {
    return {
      ...this.#value,
    };
  }
}

export default Restaurant;
