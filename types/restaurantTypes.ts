import { extractByKey } from "../src/utils/extract";
import { FOOD_CATEGORY, RESTAURANT_DISTANCE } from "../src/settings/settings";
import type RestaurantList from "../src/model/RestaurantList";

const FoodCategory = extractByKey(FOOD_CATEGORY, "value") as readonly string[];
const Distance = extractByKey(RESTAURANT_DISTANCE, "value").map(
  Number
) as readonly number[];

type FoodCategory = (typeof FoodCategory)[number];
type Distance = (typeof Distance)[number];

export interface RestaurantForm {
  readonly category: FoodCategory;
  readonly name: string;
  readonly distance: Distance;
  readonly description: string;
  readonly link: string;
}

export interface Restaurant extends RestaurantForm {
  isFavorite: boolean;
}
export type AppState = {
  restaurantList: RestaurantList;
  restaurantListElement: HTMLElement;
  restaurantAddForm: HTMLElement;
};
