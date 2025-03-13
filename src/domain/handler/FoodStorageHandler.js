// CRUD - read
export function readStorageFoodList() {
  return JSON.parse(localStorage.getItem("foodList")) || [];
}

// CURD - update
export function updateStorageFoodList(newFoodItem) {
  const foodItems = readStorageFoodList();
  foodItems.push(newFoodItem);
  localStorage.setItem("foodList", JSON.stringify(foodItems));
  return foodItems;
}

// CRUD - delete
export function deleteStorageFoodList(newFoodItem) {
  let foodItems = readStorageFoodList();
  foodItems.filter((foodItem) => foodItem !== newFoodItem);
  localStorage.setItem("foodList", JSON.stringify(foodItems));
  return foodItems;
}
