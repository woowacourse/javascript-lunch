import { Filter } from "../../domain/Filter";
import { FoodType } from "../component/FoodItemType";

export interface ReadFoodListType {
  favoriteFilter: boolean;
}

export interface AddFoodItemType {
  filter: Filter;
}

export interface DeleteFoodItemType {
  filter: Filter;
  newFoodItem: FoodType;
}

export interface UpdateFoodListType {
  foodItem: FoodType;
}

export interface OpenDetailModalType {
  filter: Filter;
  foodItem: FoodType;
}

export interface ShowConvertedItemType {
  filter: Filter;
  favoriteFilter: boolean;
}

export interface ShowFoodItemType {
  foodListComponent: HTMLElement[];
}

export interface ConvertStorageToLocalType {
  filter: Filter;
  foodList: FoodType[];
}
