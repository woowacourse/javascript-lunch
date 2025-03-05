import {
  FOOD_CATEGORY,
  ERROR_MESSAGE,
  RESTAURANT_FIELD_LENGTH,
  RESTAURANT_DISTANCE,
} from "../settings/settings.js";
import { extractByKey } from "../utils/extract.js";
import { isInRange } from "../utils/predicate.js";

export function _validateRestaurantCategory(category) {
  const categoryList = extractByKey(FOOD_CATEGORY, "value");

  if (!categoryList.includes(category)) {
    throw new Error(ERROR_MESSAGE.INVALID_CATEGORY);
  }
}

export function _validateRestaurantName(restaurantName) {
  if (
    !isInRange(
      restaurantName.length,
      RESTAURANT_FIELD_LENGTH.name.min,
      RESTAURANT_FIELD_LENGTH.name.max
    )
  ) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTAURANT_NAME_LENGTH);
  }
}

export function _validateRestaurantDistance(distance) {
  const distanceList = extractByKey(RESTAURANT_DISTANCE, "value");

  if (!distanceList.includes(distance)) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTAURANT_DISTANCE);
  }
}

export function _validateRestaurantDescription(description) {
  if (
    !isInRange(
      description.length,
      RESTAURANT_FIELD_LENGTH.description.min,
      RESTAURANT_FIELD_LENGTH.description.max
    )
  ) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTAURANT_DESCRIPTION_LENGTH);
  }
}

export function _validateRestaurantLink(link) {
  if (
    !isInRange(
      link.length,
      RESTAURANT_FIELD_LENGTH.link.min,
      RESTAURANT_FIELD_LENGTH.link.max
    )
  ) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTAURANT_LINK_LENGTH);
  }
}

export function restaurantFormValidation({
  category,
  name,
  distance,
  description,
  link,
}) {
  _validateRestaurantCategory(category);
  _validateRestaurantName(name);
  _validateRestaurantDistance(distance);
  _validateRestaurantDescription(description);
  _validateRestaurantLink(link);
}
