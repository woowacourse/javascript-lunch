import { FoodItem } from "../../component/FoodItem";
import { Modal } from "../../component/layout/Modal";
import { foodItems } from "../../mocks/foodItems";
import { getFormFoodItem } from "./FoodFormHandler";

// CRUD - create : mock Data
export function saveInitFoodList() {
  if (getStorageFoodList().length === 0) {
    localStorage.setItem("foodList", JSON.stringify(foodItems));
  }
  convertStorageToLocal();
}

// CRUD - read
export function getStorageFoodList() {
  return JSON.parse(localStorage.getItem("foodList")) || [];
}

// CRUD - update
export function addFoodItem() {
  const foodItem = getFormFoodItem();
  if (!foodItem) return;
  updateFoodList(foodItem);
  Modal.close();
}

function updateFoodList(foodItem) {
  const foodItems = getStorageFoodList();
  foodItems.push(foodItem);
  saveStorageFoodList(foodItems);
  convertStorageToLocal(foodItem);
}

function saveStorageFoodList(foodList) {
  localStorage.setItem("foodList", JSON.stringify(foodList));
}

function convertStorageToLocal() {
  const FoodItemListComponent = getStorageFoodList().map((localFoodItem) =>
    FoodItem(localFoodItem)
  );
  const foodListContainer = document.querySelector(".restaurant-list");
  foodListContainer.innerHTML = "";
  [...FoodItemListComponent].forEach((item) => {
    foodListContainer.appendChild(item);
  });
}
