import { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";

export type UserInputRestaurantDetail = {
  [K in keyof RestaurantDetail]: string;
};

export interface RestaurantDetailIsValidType {
  userInputRestaurantDetail: UserInputRestaurantDetail;
  restaurantDetails: RestaurantDetail[];
}
