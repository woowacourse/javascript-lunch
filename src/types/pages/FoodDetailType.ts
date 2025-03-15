import { Filter } from "../../domain/Filter";
import { FoodType } from "../component/FoodItemType";

export interface FoodDetailType {
  filter: Filter | null;
  foodDetailItem: FoodType;
}

export interface CloseButtonType {
  filter: Filter | null;
}
