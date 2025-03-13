import { ERROR_MESSAGE } from "../constants/error";
import { validateEmptyString } from "../validate/validateEmptyString";

class Restaurant {
  #info;
  constructor({ id, category, name, distance, description, link }) {
    this.#info = {
      id,
      category,
      name,
      distance,
      description,
      link,
      favorite: false,
    };
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

  toggleFavoriteMark = () => {
    this.#info.favorite = !this.#info.favorite;
    return this.#info.favorite;
  };

  grantId(id) {
    this.#info.id = id;
  }

  get info() {
    return {
      ...this.#info,
    };
  }
}

export default Restaurant;
