import { ERROR_MESSAGE } from "../constants/error";
import { validateEmptyString } from "../validate/validateEmptyString";

class Restaurant {
  #value;

  constructor({
    category,
    name,
    distance,
    description,
    link,
    isFavorite = false,
  }) {
    this.#value = { category, name, distance, description, link, isFavorite };
    this.#validate();
  }

  #validate() {
    validateEmptyString(
      this.#value.category,
      ERROR_MESSAGE.CATEGORY_FIELD_REQUIRED
    );
    validateEmptyString(this.#value.name, ERROR_MESSAGE.NAME_FIELD_REQUIRED);
    validateEmptyString(
      this.#value.distance,
      ERROR_MESSAGE.DISTANCE_FIELD_REQUIRED
    );
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
