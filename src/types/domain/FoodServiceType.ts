import { FoodType } from "../component/FoodItemType";

export interface ReadFoodListType {
  favoriteFilter: boolean;
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
  favoriteFilter: boolean;
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
