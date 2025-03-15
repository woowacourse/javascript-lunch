import { FoodType } from "../component/FoodItemType";

export interface SortByType {
  a: FoodType;
  b: FoodType;
}

export interface ChangeCategoryType {
  foodList: FoodType[];
}

export interface ChangeSortingType {
  foodList: FoodType[];
}

export interface UpdateFilterItemType {
  foodList: FoodType[];
}
