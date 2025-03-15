import type {
  FOOD_CATEGORY_VALUES,
  RESTAURANT_DISTANCE_VALUES,
} from "../src/settings/settings";
import type RestaurantList from "../src/model/RestaurantList";

type FoodCategory = (typeof FOOD_CATEGORY_VALUES)[number];
type Distance = (typeof RESTAURANT_DISTANCE_VALUES)[number];

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
