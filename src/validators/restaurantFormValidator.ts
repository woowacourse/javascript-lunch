import { REGEX } from "../constants/constants";
import { Restaurant } from "../types/types";

const restaurantFormValidator = {
  verify(restaurantItem: Restaurant) {
    const errors: { [key: string]: Boolean } = {};

    errors["category"] = this.isEmptyCategory(restaurantItem.category);
    errors["name"] = this.isInvalidName(restaurantItem.name);
    errors["distance"] = this.isEmptyDistance(restaurantItem.distance);
    errors["link"] = this.isInvalidLink(restaurantItem.link);

    return errors;
  },

  isEmptyCategory(input: string) {
    return input === "";
  },

  isEmptyDistance(input: number) {
    return input === 0;
  },

  isInvalidName(input: string) {
    return !REGEX.VALID_NAME.test(input);
  },

  isInvalidLink(input: string | undefined) {
    if (input) return !REGEX.VALID_URL.test(input);
    return false;
  },
};

export default restaurantFormValidator;
