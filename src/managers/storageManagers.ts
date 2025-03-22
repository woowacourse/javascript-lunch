import { FoodItemType } from "../types/food";

const FOOD_ITEMS_KEY = "foodItems";

export function storeFoodItems(foodItems: FoodItemType[]) {
  localStorage.setItem(FOOD_ITEMS_KEY, JSON.stringify(foodItems));
}

export function getStoredFoodItems() {
  const storedItems = localStorage.getItem(FOOD_ITEMS_KEY);

  return storedItems ? JSON.parse(storedItems) : [];
}
