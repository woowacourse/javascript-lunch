import { AddDetailModal } from "../components/AddDetailModal.js";
import { initialRestaurants } from "../data/initialRestaurants.js";
import removeModal from "../utils/removeModal.js";

export function handleRestaurantClick(e) {
  const $clickedItem = e.target.closest(".restaurant");
  const { restaurantId } = $clickedItem.dataset;

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
    console.log(item.dataset.restaurantId);
    console.log(e.target.dataset.restaurantId);
    if (
      Number(item.dataset.restaurantId) ===
      Number(e.target.dataset.restaurantId)
    ) {
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
}

export function setupAddDetailtModal($container, selectedRestaurant) {
  AddDetailModal($container, selectedRestaurant);
  setupRestaurantItemEventListeners();
}
