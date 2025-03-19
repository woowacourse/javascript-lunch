import { FoodType } from "../component/FoodItemType";

export interface ReadFoodListType {
  isFavoriteFilterActive: boolean;
}

export interface AddFoodItemType {
  foodItem: FoodType;
}

export interface DeleteFoodItemType {
  newFoodItem: FoodType;
}

export interface UpdateFoodListType {
  foodItem: FoodType;
}

export interface OpenDetailModalType {
  foodItem: FoodType;
}

export interface ShowConvertedItemType {
  isFavoriteFilterActive: boolean;
}

export interface ShowFoodItemType {
  foodListComponent: HTMLElement[];
}

export interface CreateFoodListComponentType {
  foodList: FoodType[];
}

export interface CreateFoodItemComponentType {
  localFoodItem: FoodType;
}
