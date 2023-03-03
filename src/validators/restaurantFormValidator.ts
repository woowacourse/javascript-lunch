import { REGEX, ERROR_MESSAGE } from "../constants/constants";
import { Restaurant } from "../types/types";

export const restaurantFormValidator = {
  verify(restaurantItem: Restaurant) {
    const Errors: { [key: string]: Boolean } = {};

    Errors["category"] = this.isEmptyCategory(restaurantItem.category);
    Errors["name"] = this.isInvalidName(restaurantItem.name);
    Errors["distance"] = this.isEmptyDistance(restaurantItem.distance);
    Errors["link"] = this.isInvalidLink(restaurantItem.link);

    return Errors;
  },

  isEmptyCategory(input: string) {
    if (!input) return true;

    return false;
  },

  isEmptyDistance(input: number) {
    if (!input) return true;

    return false;
  },

  isInvalidName(input: string) {
    return !REGEX.VALID_NAME.test(input);
  },

  isInvalidLink(input: string | undefined) {
    if (input) return !REGEX.VALID_URL.test(input);
    return false;
  },
};
