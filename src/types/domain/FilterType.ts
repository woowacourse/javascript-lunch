import { FoodType } from "../component/FoodItemType";

export interface SortByType {
  a: FoodType;
  b: FoodType;
}

export type FilterType = "category" | "sorting";
export interface ChangeCategoryType {
  foodList: FoodType[];
  filter: FilterType;
}

export interface ChangeSortingType {
  foodList: FoodType[];
}

export interface UpdateFilterItemType {
  foodList: FoodType[];
}
