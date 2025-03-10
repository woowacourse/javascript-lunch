import {
  FOOD_CATEGORY,
  ERROR_MESSAGE,
  RESTAURANT_FIELD_LENGTH,
  RESTAURANT_DISTANCE,
} from "../settings/settings.ts";
import { extractByKey } from "../utils/extract.ts";
import { isInRange } from "../utils/predicate.ts";
import { RestaurantForm } from "../../types/restaurantTypes.ts";

const categoryList: string[] = extractByKey(FOOD_CATEGORY, "value");
const distanceList: string[] = extractByKey(RESTAURANT_DISTANCE, "value");

export function _validateRestaurantCategory(category: string): void {
  if (!categoryList.includes(category)) {
    throw new Error(ERROR_MESSAGE.INVALID_CATEGORY);
  }
}

export function _validateRestaurantName(restaurantName: string): void {
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

export function _validateRestaurantDistance(distance: string): void {
  if (!distanceList.includes(distance)) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTAURANT_DISTANCE);
  }
}

export function _validateRestaurantDescription(description: string): void {
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

export function _validateRestaurantLink(link: string): void {
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

export function restaurantFormValidation(restaurant: RestaurantForm): void {
  _validateRestaurantCategory(restaurant.category);
  _validateRestaurantName(restaurant.name);
  _validateRestaurantDistance(restaurant.distance);
  _validateRestaurantDescription(restaurant.description);
  _validateRestaurantLink(restaurant.link);
}
