import { removeStoredFoodItem, storeFoodItems } from "../../managers/storageManagers.ts";

export function addItem(originFoodItems: FoodItemType[], foodItem: FoodItemType) {
  const updatedFoodItems = [...originFoodItems, foodItem];
  storeFoodItems(updatedFoodItems);

  return updatedFoodItems;
}

export function deleteFoodItem(originFoodItems: FoodItemType[], id: string) {
  removeStoredFoodItem(id);

  return originFoodItems.filter((foodItem) => foodItem.id !== id);
}

export function toggleFavoriteFoodItem(originFoodItems: FoodItemType[], id: string) {
  const updatedFoodItems = originFoodItems.map((foodItem: FoodItemType) => {
    if (foodItem.id === id) {
      return { ...foodItem, isFavorite: !foodItem.isFavorite };
    }
    return foodItem;
  });
  storeFoodItems(updatedFoodItems);

  return updatedFoodItems;
}
