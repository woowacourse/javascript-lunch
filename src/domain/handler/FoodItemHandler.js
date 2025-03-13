import { FoodItem } from "../../component/FoodItem";
import { Modal } from "../../component/layout/Modal";
import { foodItems } from "../../mocks/foodItems";
import { FoodDetail } from "../../pages/FoodDetail";
import { Filter } from "../Filter";
import { getFormFoodItem } from "./FoodFormHandler";

// CRUD - create : mock Data
export function saveInitFoodList(modal) {
  const filter = new Filter();
  if (getStorageFoodList().length === 0) {
    localStorage.setItem("foodList", JSON.stringify(foodItems));
  }
  const foodList = getStorageFoodList().sort((a, b) => filter.sortBy(a, b));
  convertStorageToLocal(foodList, modal);
}

// CRUD - read
export function getStorageFoodList() {
  return JSON.parse(localStorage.getItem("foodList")) || [];
}

// CRUD - update
export function addFoodItem(filter, modal) {
  const foodItem = getFormFoodItem();
  if (!foodItem) return;
  updateFoodList(foodItem, filter, modal);
  Modal.close();
}

function updateFoodList(foodItem, filter, modal) {
  const foodItems = getStorageFoodList();
  foodItems.push(foodItem);
  saveStorageFoodList(foodItems);
  const foodList = getStorageFoodList().sort((a, b) => filter.sortBy(a, b));
  filter.reset();
  convertStorageToLocal(foodList, modal);
}

function saveStorageFoodList(foodList) {
  localStorage.setItem("foodList", JSON.stringify(foodList));
}

// 화면에 출력하기
export function convertStorageToLocal(foodList, modal) {
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
