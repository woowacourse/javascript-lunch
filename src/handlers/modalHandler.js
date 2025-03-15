import AddRestaurantModal from "../components/AddRestaurantModal.js";
import { handleAddRestaurant } from "./restaurantHandler.js";
import removeModal from "../utils/removeModal.js";

function setupModalEventListeners() {
  const $addRestaurantButton = document.querySelector(".button--primary"); // 오타 수정
  const $closeModalButton = document.getElementById("close-modal");

  if ($addRestaurantButton) {
    $addRestaurantButton.addEventListener("click", handleAddRestaurant);
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
export function setupAddRestaurantModal($container) {
  AddRestaurantModal($container);
  setupModalEventListeners();
}
