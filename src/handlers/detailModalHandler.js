import { AddDetailModal } from "../components/AddDetailModal.js";
import { initialRestaurants } from "../data/initialRestaurants.js";
import removeModal from "../utils/removeModal.js";
import { setupFavoriteEventListeners } from "./favoriteHandler.js";

let selectedRestaurantId = null;
export function handleRestaurantClick(e) {
  const $clickedItem = e.target.closest(".restaurant");

  if ($clickedItem.classList.contains("modal-restaurant")) {
    return;
  }

  const { restaurantId } = $clickedItem.dataset;

  selectedRestaurantId = Number(restaurantId);
  const selectedRestaurant = initialRestaurants.find(
    (restaurant) => restaurant.id === Number(restaurantId),
  );

  const $appContainer = document.getElementById("app");
  setupAddDetailtModal($appContainer, selectedRestaurant);
}

export function handleDeleteRestaurant(e) {
  e.preventDefault();
  const $restaurantList = document.querySelector(".restaurant-list");
  const $restaurantItems = $restaurantList.querySelectorAll(".restaurant");

  $restaurantItems.forEach((item) => {
    if (Number(item.dataset.restaurantId) === Number(selectedRestaurantId)) {
      item.remove();
    }
  });
  removeModal();
}

export function setupRestaurantItemEventListeners() {
  const $restaurantItems = document.querySelectorAll(".restaurant");
  const $deleteButton = document.querySelector("#delete--restaurant");
  const $closeButton = document.querySelector("#close--modal");

  $restaurantItems.forEach((item) => {
    item.addEventListener("click", handleRestaurantClick);
  });

  if ($deleteButton) {
    $deleteButton.addEventListener("click", handleDeleteRestaurant);
  } else {
    console.warn("삭제 버튼을 DOM에서 찾을 수 없습니다.");
  }

  if ($closeButton) {
    $closeButton.addEventListener("click", () => {
      removeModal();
    });
  } else {
    console.warn("모달 닫기 버튼을 DOM에서 찾을 수 없습니다.");
  }
  const $modalBackdrop = document.querySelector(".modal-backdrop");
  if ($modalBackdrop) {
    $modalBackdrop.removeEventListener("click", removeModal);
    $modalBackdrop.addEventListener("click", (e) => {
      e.stopPropagation();
      removeModal();
      selectedRestaurantId = null;
    });
  }
}

export function setupAddDetailtModal($container, selectedRestaurant) {
  AddDetailModal($container, selectedRestaurant);
  setupRestaurantItemEventListeners();
  setupFavoriteEventListeners();
}
