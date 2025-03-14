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
export function readFoodList(filter, favoriteFilter = false) {
  const previousFoodList = readStorageFoodList().filter((item) => {
    if (favoriteFilter) return item.favorite === true;
    return item;
  });
  if (previousFoodList.length === 0 && !favoriteFilter) {
    localStorage.setItem("foodList", JSON.stringify(foodItems));
  }
  convertStorageToLocal(filter, sortedFoodList(filter, previousFoodList));
}

// CRUD - update
export function addFoodFormItem(filter) {
  const foodItem = getFormFoodItem();
  if (!foodItem) return;
  const updatedFoodList = updateStorageFoodList(foodItem);
  Modal.close(filter);
}

function addFoodItem(filter, newFoodItem) {
  const updatedFoodList = updateStorageFoodList(newFoodItem);
  Modal.close(filter);
}

export function deleteFoodItem(filter, newFoodItem) {
  const deletedFoodList = deleteStorageFoodList(newFoodItem);
  Modal.close(filter);
}

export function sortedFoodList(filter, foodList) {
  filter.reset();
  return foodList.sort((a, b) => filter.sortBy(a, b));
}

// 화면에 출력하기
export function convertStorageToLocal(filter = null, foodList) {
  const FoodItemListComponent = foodList.map((localFoodItem) => {
    const foodComponent = FoodItem(
      localFoodItem,
      (foodItem) => openDetailModal(filter, foodItem),
      (event, foodItem) => handleFavoriteButton(event, foodItem, filter)
    );

    return foodComponent;
  });
  showFoodItem(FoodItemListComponent);
}

function openDetailModal(filter, foodItem) {
  Modal.setContent(FoodDetail(filter, foodItem), filter);
  Modal.open();
}

function handleFavoriteButton(event, foodItem, filter) {
  const favoriteState = document.querySelector(
    ".tab-button_favorite.selected-button"
  );

  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateStorageFoodList(foodItem);

  if (favoriteState) {
    readFoodList(filter, true);
  } else readFoodList(filter);
  event.stopPropagation();
}

export function showFoodItem(foodListComponent) {
  const foodListContainer = document.querySelector(".restaurant-list");
  foodListContainer.innerHTML = "";
  [...foodListComponent].forEach((item) => {
    foodListContainer.appendChild(item);
  });
}
