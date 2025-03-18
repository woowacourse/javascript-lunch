import {
  FOOD_CATEGORY,
  ERROR_MESSAGE,
  RESTAURANT_FIELD_LENGTH,
  RESTAURANT_DISTANCE,
} from "../settings/settings.ts";
import { extractByKey } from "../utils/extract.ts";
import { isInRange } from "../utils/predicate.ts";
import type { Category, Distance, Restaurant } from "../types/type.ts";

export function _validateRestaurantCategory(category: Category) {
  const categoryList = extractByKey(FOOD_CATEGORY, "value");

  if (!categoryList.includes(category)) {
    throw new Error(ERROR_MESSAGE.INVALID_CATEGORY);
  }
}

export function _validateRestaurantName(restaurantName: string) {
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

export function _validateRestaurantDistance(distance: Distance) {
  const distanceList = extractByKey(RESTAURANT_DISTANCE, "value");

  if (!distanceList.includes(distance)) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTAURANT_DISTANCE);
  }
}

export function _validateRestaurantDescription(description: string) {
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

export function _validateRestaurantLink(link: string) {
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
}: Restaurant) {
  _validateRestaurantCategory(category);
  _validateRestaurantName(name);
  _validateRestaurantDistance(Number(distance) as Distance);
  description && _validateRestaurantDescription(description);
  link && _validateRestaurantLink(link);
}
