import { ERROR_MESSAGE } from "../constants/error";
import { validateEmptyString } from "../validate/validateEmptyString";

class Restaurant {
  #info;
  constructor({ category, name, distance, description, link }) {
    this.#info = { category, name, distance, description, link };
    this.validate();
  }

  validate() {
    validateEmptyString(
      this.#info.category,
      ERROR_MESSAGE.CATEGORY_FIELD_REQUIRED
    );
    validateEmptyString(this.#info.name, ERROR_MESSAGE.NAME_FIELD_REQUIRED);
    validateEmptyString(
      this.#info.distance,
      ERROR_MESSAGE.DISTANCE_FIELD_REQUIRED
    );
  }

  get info() {
    return {
      ...this.#info,
    };
  }
}

export default Restaurant;
