// CRUD - read
export function readStorageFoodList() {
  return JSON.parse(localStorage.getItem("foodList")) || [];
}

// CURD - update
export function updateStorageFoodList(newFoodItem) {
  let foodItems = readStorageFoodList(); // 기존 배열 가져오기

  const index = foodItems.findIndex((item) => item.name === newFoodItem.name);

  if (index !== -1) {
    foodItems[index].favorite = newFoodItem.favorite;
  } else {
    foodItems.push(newFoodItem);
  }
  localStorage.setItem("foodList", JSON.stringify(foodItems));
  return foodItems;
}

// CRUD - delete
export function deleteStorageFoodList(newFoodItem) {
  let foodItems = readStorageFoodList();
  foodItems = foodItems.filter(
    (foodItem) => JSON.stringify(foodItem) != JSON.stringify(newFoodItem)
  );
  localStorage.setItem("foodList", JSON.stringify(foodItems));
  return foodItems;
}
