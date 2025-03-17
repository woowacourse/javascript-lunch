import { notifyFavoriteChange } from "./eventManager/favoriteEventManager";

export function storeFoodItems(foodItems: FoodItemType[]) {
  localStorage.setItem("foodItems", JSON.stringify(foodItems));
}

export function getStoredFoodItems() {
  const storedItems = localStorage.getItem("foodItems");

  return storedItems ? JSON.parse(storedItems) : [];
}

export function removeStoredFoodItem(id: string) {
  const filteredItems = getStoredFoodItems().filter((item: FoodItemType) => item.id !== id);
  localStorage.setItem("foodItems", JSON.stringify(filteredItems));
}

export function toggleFavorite(id: string) {
  const resultItems = getStoredFoodItems().map((foodItem: FoodItemType) => {
    if (foodItem.id === id) {
      return { ...foodItem, isFavorite: !foodItem.isFavorite };
    }
    return foodItem;
  });
  storeFoodItems(resultItems);
  notifyFavoriteChange(id);
}
