import { FOOD_CATEGORY_VALUES } from "../settings/category.ts";
import {
  RESTAURANT_FIELD_LENGTH,
  RESTAURANT_DISTANCE_VALUES,
} from "../settings/restaurant.ts";
import { ERROR_MESSAGE } from "../settings/errorMessages.ts";
import { isInRange } from "../utils/predicate.ts";
import type {
  Restaurant,
  RestaurantForm,
} from "../../types/restaurantTypes.ts";

export function _validateRestaurantCategory(
  category: "한식" | "중식" | "일식" | "아시안" | "양식" | "기타"
): void {
  if (!FOOD_CATEGORY_VALUES.includes(category)) {
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
  if (!RESTAURANT_DISTANCE_VALUES.includes(distance.toString())) {
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
