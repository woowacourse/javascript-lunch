import { Filter } from "../../domain/Filter";
import { FoodType } from "../component/FoodItemType";

export interface ChangeFavoriteStatusType {
  event: Event;
  foodItem: FoodType;
  filter: Filter;
}
