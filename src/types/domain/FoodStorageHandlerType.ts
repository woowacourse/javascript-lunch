import { FoodType } from "../component/FoodItemType";

export interface UpdateStorageFoodListType {
  foodItem: FoodType;
}

export interface DeleteStorageFoodListType {
  newFoodItem: FoodType;
}
