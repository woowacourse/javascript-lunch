import { extractByKey } from "../src/utils/extract";
import { FOOD_CATEGORY, RESTAURANT_DISTANCE } from "../src/settings/settings";

const FoodCategory = extractByKey(FOOD_CATEGORY, "value") as readonly string[];
const Distance = extractByKey(
  RESTAURANT_DISTANCE,
  "value"
) as readonly string[];

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
