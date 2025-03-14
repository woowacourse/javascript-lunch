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
export function readFoodList(filter, modal) {
  const previousFoodList = readStorageFoodList();
  if (previousFoodList.length === 0) {
    localStorage.setItem("foodList", JSON.stringify(foodItems));
  }
  convertStorageToLocal(modal, filter, sortedFoodList(filter));
}

// CRUD - update
export function addFoodFormItem(filter, modal) {
  const foodItem = getFormFoodItem();
  if (!foodItem) return;
  const updatedFoodList = updateStorageFoodList(foodItem);
  // convertStorageToLocal(modal, sortedFoodList(filter));
  Modal.close(filter, modal);
}

export function deleteFoodItem(filter, newFoodItem, modal) {
  const deletedFoodList = deleteStorageFoodList(newFoodItem);
  Modal.close(filter, modal);
  // convertStorageToLocal(modal, sortedFoodList(filter));
}

export function sortedFoodList(filter) {
  const foodLIst = readStorageFoodList();
  filter.reset();
  return foodLIst.sort((a, b) => filter.sortBy(a, b));
}

// 화면에 출력하기
export function convertStorageToLocal(modal = null, filter = null, foodList) {
  const FoodItemListComponent = foodList.map((localFoodItem) => {
    const foodComponent = FoodItem(localFoodItem, (foodItem) => {
      openDetailModal(modal, filter, foodItem);
    });

    foodComponent
      .querySelector(".restaurant-star")
      .addEventListener("click", (event) => {
        event.stopPropagation();
      });

    return foodComponent;
  });
  showFoodItem(FoodItemListComponent);
}

function openDetailModal(modal, filter, foodItem) {
  modal.setModalContent(FoodDetail(filter, foodItem, modal), filter, modal);
  Modal.open();
}

export function showFoodItem(foodListComponent) {
  const foodListContainer = document.querySelector(".restaurant-list");
  foodListContainer.innerHTML = "";
  [...foodListComponent].forEach((item) => {
    foodListContainer.appendChild(item);
  });
}
