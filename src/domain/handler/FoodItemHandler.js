import { FoodItem } from "../../component/FoodItem";
import { Modal } from "../../component/layout/Modal";
import { foodItems } from "../../mocks/foodItems";
import { Filter } from "../Filter";
import { getFormFoodItem } from "./FoodFormHandler";

// CRUD - create : mock Data
export function saveInitFoodList() {
  const filter = new Filter();
  if (getStorageFoodList().length === 0) {
    localStorage.setItem("foodList", JSON.stringify(foodItems));
  }
  const foodList = getStorageFoodList().sort((a, b) => filter.sortBy(a, b));
  convertStorageToLocal(foodList);
}

// CRUD - read
export function getStorageFoodList() {
  return JSON.parse(localStorage.getItem("foodList")) || [];
}

// CRUD - update
export function addFoodItem(filter) {
  const foodItem = getFormFoodItem();
  if (!foodItem) return;
  updateFoodList(foodItem, filter);
  Modal.close();
}

function updateFoodList(foodItem, filter) {
  const foodItems = getStorageFoodList();
  foodItems.push(foodItem);
  saveStorageFoodList(foodItems);
  const foodList = getStorageFoodList().sort((a, b) => filter.sortBy(a, b));
  filter.reset();
  convertStorageToLocal(foodList);
}

function saveStorageFoodList(foodList) {
  localStorage.setItem("foodList", JSON.stringify(foodList));
}

// 화면에 출력하기

export function convertStorageToLocal(foodList) {
  const FoodItemListComponent = foodList.map((localFoodItem) =>
    FoodItem(localFoodItem)
  );
  const foodListContainer = document.querySelector(".restaurant-list");
  foodListContainer.innerHTML = "";
  [...FoodItemListComponent].forEach((item) => {
    foodListContainer.appendChild(item);
  });
}
