import RestaurantDetailValidator from "./RestaurantDetailValidator";

import type { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";
import type { ErrorMessages } from "../type";

export type UserInputRestaurantDetail = {
  [K in keyof RestaurantDetail]: K extends "isFavorite" ? boolean : string;
};

export interface RestaurantDetailIsValidType {
  userInputRestaurantDetail: UserInputRestaurantDetail;
  restaurantDetails: RestaurantDetail[];
}

export type RestaurantDetailValidatorErrorMessages = ErrorMessages<
  typeof RestaurantDetailValidator
>;
