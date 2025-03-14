import { notifyFavoriteChange } from "./eventManagers";

export function storeFoodItems(foodItem: FoodItemProps) {
  localStorage.setItem("foodItems", JSON.stringify(foodItem));
}

export function getStoredFoodItems() {
  const storedItems = localStorage.getItem("foodItems");
  if (storedItems) return JSON.parse(storedItems);

  return [];
}

export function removeStoredFoodItem(id: string) {
  const filteredItems = getStoredFoodItems().filter((item: FoodItemProps) => item.id !== id);
  localStorage.setItem("foodItems", JSON.stringify(filteredItems));
}

export function toggleFavorite(id: string) {
  const resultItems = getStoredFoodItems().map((foodItem: FoodItemProps) => {
    if (foodItem.id === id) {
      return { ...foodItem, isFavorite: !foodItem.isFavorite };
    }
    return foodItem;
  });
  storeFoodItems(resultItems);
  notifyFavoriteChange(id);
}
