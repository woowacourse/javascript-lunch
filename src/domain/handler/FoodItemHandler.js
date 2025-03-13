import { FoodItem } from "../../component/FoodItem";
import { Modal } from "../../component/layout/Modal";
import { foodItems } from "../../mocks/foodItems";
import { FoodDetail } from "../../pages/FoodDetail";
import { Filter } from "../Filter";
import { getFormFoodItem } from "./FoodFormHandler";
import {
  deleteStorageFoodList,
  readStorageFoodList,
  updateStorageFoodList,
} from "./FoodStorageHandler";

// CRUD - create : mock Data
export function saveInitFoodList(filter, modal) {
  // const filter = new Filter();
  const previousFoodList = readStorageFoodList();
  if (previousFoodList.length === 0) {
    localStorage.setItem("foodList", JSON.stringify(foodItems));
  }
  convertStorageToLocal(modal, sortedFoodList(filter));
}

// CRUD - update
export function addFoodFormItem(filter, modal) {
  const foodItem = getFormFoodItem();
  if (!foodItem) return;
  const updatedFoodList = updateStorageFoodList(foodItem);
  convertStorageToLocal(modal, sortedFoodList(filter));
  Modal.close();
}

export function deleteFoodItem(filter, modal, newFoodItem) {
  const deletedFoodList = deleteStorageFoodList(newFoodItem);
  convertStorageToLocal(modal, sortedFoodList(filter));
}

function sortedFoodList(filter) {
  const foodLIst = readStorageFoodList();
  filter.reset();
  return foodLIst.sort((a, b) => filter.sortBy(a, b));
}

// 화면에 출력하기
export function convertStorageToLocal(modal, foodList) {
  // const foodList = newFoodList.sort((a, b) => filter.sortBy(a, b));
  const FoodItemListComponent = foodList.map((localFoodItem) => {
    const foodComponent = FoodItem(localFoodItem);
    foodComponent.addEventListener("click", () => {
      modal.setModalContent(FoodDetail(localFoodItem));
      Modal.open();
    });

    return foodComponent;
  });
  const foodListContainer = document.querySelector(".restaurant-list");
  foodListContainer.innerHTML = "";
  [...FoodItemListComponent].forEach((item) => {
    foodListContainer.appendChild(item);
  });
}
