export function storeFoodItems(foodItem: FoodItemProps) {
  localStorage.setItem("foodItems", JSON.stringify(foodItem));
}

export function getStoredFoodItems() {
  const storedItems = localStorage.getItem("foodItems");
  if (storedItems) return JSON.parse(storedItems);

  return [];
}

export function getStoredCount() {
  return getStoredFoodItems().length;
}

export function toggleFavorite(id: string) {
  const resultItems = getStoredFoodItems().map((foodItem: FoodItemProps) => {
    if (foodItem.id === id) {
      return { ...foodItem, isFavorite: !foodItem.isFavorite };
    }
    return foodItem;
  });
  storeFoodItems(resultItems);
}
