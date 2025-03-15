import { Filter } from "../../domain/Filter";
import { FoodType } from "../component/FoodItemType";

export interface ReadFoodListType {
  favoriteFilter: boolean;
}

export interface AddFoodItemType {
  filter: Filter | null;
}

export interface DeleteFoodItemType {
  filter: Filter | null;
  newFoodItem: FoodType;
}

export interface SortedFoodListType {
  filter: Filter | null;
  foodList: FoodType[];
}

export interface OpenDetailModalType {
  filter: Filter | null;
  foodItem: FoodType;
}

export interface ShowConvertedItemType {
  filter: Filter | null;
  favoriteFilter: boolean;
}

export interface ShowFoodItemType {
  foodListComponent: HTMLElement[];
}

export interface ConvertStorageToLocalType {
  filter: Filter | null;
  foodList: FoodType[];
}
