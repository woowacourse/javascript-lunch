import type { ErrorTargetElementsDictionary } from "./RestaurantAddForm.type";

import RestaurantDetailValidator from "../../../validator/restaurantDetail/RestaurantDetailValidator";

import { ELEMENT_SELECTOR } from "../../../constants/selector";

const {
  emptyCategory,
  emptyRestaurantName,
  emptyDistance,
  duplicateNames,
  invalidUrlFormat,
} = RestaurantDetailValidator.validationTypes;

export const ERROR_TARGET_ELEMENTS_DICTIONARY: ErrorTargetElementsDictionary = {
  [emptyCategory.errorMessage]: ELEMENT_SELECTOR.categorySelect,

  [emptyRestaurantName.errorMessage]: ELEMENT_SELECTOR.nameInput,

  [emptyDistance.errorMessage]: ELEMENT_SELECTOR.distanceSelect,

  [duplicateNames.errorMessage]: ELEMENT_SELECTOR.nameInput,

  [invalidUrlFormat.errorMessage]: ELEMENT_SELECTOR.urlInput,
};
