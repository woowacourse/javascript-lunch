import {
  FOOD_CATEGORY,
  ERROR_MESSAGE,
  RESTAURANT_FIELD_LENGTH,
  RESTAURANT_DISTANCE,
} from "../settings/settings.ts";
import { extractByKey } from "../utils/extract.ts";
import { isInRange } from "../utils/predicate.ts";
import { Restaurant, RestaurantForm } from "../../types/restaurantTypes.ts";

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

export function _validateRestaurantDistance(distance: number): void {
  if (!distanceList.includes(distance.toString())) {
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

export function restaurantFormValidation(
  restaurantForm: RestaurantForm
): Restaurant {
  _validateRestaurantCategory(restaurantForm.category);
  _validateRestaurantName(restaurantForm.name);
  _validateRestaurantDistance(restaurantForm.distance);
  _validateRestaurantDescription(restaurantForm.description);
  _validateRestaurantLink(restaurantForm.link);

  const { name, distance, description, category, link } = restaurantForm;

  // 순서가 뒤죽 박죽 되어 있는것을 일부로 표준으로 포멧팅함.
  return {
    name,
    distance: +distance,
    description,
    category,
    link,
    isFavorite: false,
  };
}
