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
  category: FoodCategory;
  name: string;
  distance: Distance;
  description: string;
  link: string;
}
