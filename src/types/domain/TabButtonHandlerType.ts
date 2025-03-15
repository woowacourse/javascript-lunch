import { Filter } from "../../domain/Filter";
import { FoodType } from "../component/FoodItemType";

export interface HandleFavoriteButtonType {
  event: Event;
  foodItem: FoodType;
  filter: Filter;
}
