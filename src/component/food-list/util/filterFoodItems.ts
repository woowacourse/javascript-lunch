import { FoodItemType } from "../../../types/food";

export function filterFoodItemsByCategory(category: string, foodItems: FoodItemType[]) {
  if (category === "") {
    return foodItems;
  }
  return foodItems.filter((foodItem: FoodItemType) => foodItem.category === category);
}
