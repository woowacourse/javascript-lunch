import { FoodType } from "../types/component/FoodItemType";
import {
  DeleteStorageFoodListType,
  UpdateStorageFoodListType,
} from "../types/domain/FoodStorageType";

// CRUD - read
export function readStorageFoodList() {
  const localStorageFoodList = localStorage.getItem("foodList");
  return localStorageFoodList ? JSON.parse(localStorageFoodList) : [];
}

// CURD - update
export function updateStorageFoodList({ foodItem }: UpdateStorageFoodListType) {
  let foodList = readStorageFoodList(); // 기존 배열 가져오기

  const index = foodList.findIndex(
    (item: FoodType) => item.name === foodItem.name
  );

  if (index !== -1) {
    foodList[index].favorite = foodItem.favorite;
  } else {
    foodList.push(foodItem);
  }
  localStorage.setItem("foodList", JSON.stringify(foodList));
  return foodList;
}

// CRUD - delete
export function deleteStorageFoodList({
  newFoodItem,
}: DeleteStorageFoodListType) {
  let foodList = readStorageFoodList();
  foodList = foodList.filter(
    (foodItem: FoodType) =>
      JSON.stringify(foodItem) != JSON.stringify(newFoodItem)
  );
  localStorage.setItem("foodList", JSON.stringify(foodList));
  return foodList;
}
