import { FoodItemType } from "../types/food";

export function sortFoodItem(sortOption: string, foodItems: FoodItemType[]) {
  if (sortOption === "이름순") {
    foodItems.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortOption === "거리순") {
    foodItems.sort((a, b) => Number(a.distance) - Number(b.distance));
  }
  return foodItems;
}
