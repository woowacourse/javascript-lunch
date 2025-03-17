import { FoodType } from "../../types/component/FoodItemType";
import {
  DeleteStorageFoodListType,
  UpdateStorageFoodListType,
} from "../../types/domain/FoodStorageHandlerType";

// CRUD - read
export function readStorageFoodList() {
  const localStorageFoodList = localStorage.getItem("foodList");
  return localStorageFoodList ? JSON.parse(localStorageFoodList) : [];
}

// CURD - update
export function updateStorageFoodList({ foodItem }: UpdateStorageFoodListType) {
  let foodItems = readStorageFoodList(); // 기존 배열 가져오기

  const index = foodItems.findIndex(
    (item: FoodType) => item.name === foodItem.name
  );

  if (index !== -1) {
    foodItems[index].favorite = foodItem.favorite;
  } else {
    foodItems.push(foodItem);
  }
  localStorage.setItem("foodList", JSON.stringify(foodItems));
  return foodItems;
}

// CRUD - delete
export function deleteStorageFoodList({
  newFoodItem,
}: DeleteStorageFoodListType) {
  let foodItems = readStorageFoodList();
  foodItems = foodItems.filter(
    (foodItem: FoodType) =>
      JSON.stringify(foodItem) != JSON.stringify(newFoodItem)
  );
  localStorage.setItem("foodList", JSON.stringify(foodItems));
  return foodItems;
}
