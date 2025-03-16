import AddRestaurantModal from "../components/AddRestaurantModal.js";
import { handleAddRestaurant } from "./restaurantHandler.ts";
import removeModal from "../utils/removeModal.js";
import { Restaurant } from "../../types/Restaurant.ts";

function setupModalEventListeners() : void {
  const $addRestaurantButton = document.querySelector(".button--primary");
  const $closeModalButton = document.getElementById("close-modal");

  if ($addRestaurantButton) {
    $addRestaurantButton.addEventListener("click", handleAddRestaurant as EventListener);
  } else {
    console.warn("레스토랑 추가 버튼을 DOM에서 찾을 수 없습니다.");
  }

  if ($closeModalButton) {
    $closeModalButton.addEventListener("click", () => {
      removeModal();
    });
  } else {
    console.warn("모달 닫기 버튼을 DOM에서 찾을 수 없습니다.");
  }
}
export function setupAddRestaurantModal($container : HTMLElement) : void {
  AddRestaurantModal($container);
  setupModalEventListeners();
}
