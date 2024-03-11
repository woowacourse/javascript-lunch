import type { RestaurantDetailValidatorErrorMessages } from "../../../validator/restaurantDetail/RestaurantDetailValidator.type";

export type ErrorTargetElementsDictionary = {
  [K in RestaurantDetailValidatorErrorMessages[keyof RestaurantDetailValidatorErrorMessages]]: string;
};
