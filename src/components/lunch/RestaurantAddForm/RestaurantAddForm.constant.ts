import { ELEMENT_SELECTOR } from "../../../constants/selector";
import { $ } from "../../../utils/dom";

import RestaurantDetailValidator from "../../../validator/restaurantDetail/RestaurantDetailValidator";

type ValidationTypes = typeof RestaurantDetailValidator.validationTypes;

type ErrorMessages = {
  [K in keyof ValidationTypes]: ValidationTypes[K]["errorMessage"];
};

type ErrorTargetElementsDictionary = {
  [K in ErrorMessages[keyof ErrorMessages]]: string;
};

export const ERROR_TARGET_ELEMENTS_DICTIONARY: ErrorTargetElementsDictionary = {
  [RestaurantDetailValidator.validationTypes.emptyCategory.errorMessage]:
    ELEMENT_SELECTOR.categorySelect,

  [RestaurantDetailValidator.validationTypes.emptyRestaurantName.errorMessage]:
    ELEMENT_SELECTOR.nameInput,

  [RestaurantDetailValidator.validationTypes.emptyDistance.errorMessage]:
    ELEMENT_SELECTOR.distanceSelect,

  [RestaurantDetailValidator.validationTypes.duplicateNames.errorMessage]:
    ELEMENT_SELECTOR.nameInput,

  [RestaurantDetailValidator.validationTypes.invalidUrlFormat.errorMessage]:
    ELEMENT_SELECTOR.urlInput,
};
