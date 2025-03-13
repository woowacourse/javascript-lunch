export function storeFoodItems(foodItems: FoodItemProps) {
  localStorage.setItem("foodItem", JSON.stringify(foodItems));
}

export function getStoredFoodItems() {
  const storedItems = localStorage.getItem("foodItem");
  if (storedItems) {
    return JSON.parse(storedItems);
  }

  return [];
}

export function storeFavoriteItems(foodItems: FoodItemProps) {
  localStorage.setItem("favoriteItem", JSON.stringify(foodItems));
}

export function getStoredFavoriteItems() {
  const storedItems = localStorage.getItem("favoriteItem");
  if (storedItems) {
    return JSON.parse(storedItems);
  }

  return [];
}
