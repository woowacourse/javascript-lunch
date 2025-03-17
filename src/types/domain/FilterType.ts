import { FoodType } from "../component/FoodItemType";

export interface SortByType {
  a: FoodType;
  b: FoodType;
}

export type FilterType = "category" | "sorting";
export interface ChangeCategoryType {
  filter: FilterType;
}

export interface ChangeSortingType {
  foodList: FoodType[];
}

export interface UpdateFilterItemType {
  foodList: FoodType[];
}
export interface SortedFoodListType {
  foodList: FoodType[];
}
