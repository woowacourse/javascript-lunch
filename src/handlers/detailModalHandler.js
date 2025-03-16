import { AddDetailModal } from "../components/AddDetailModal.js";
import { initialRestaurants } from "../data/initialRestaurants.ts";
import removeModal from "../utils/removeModal.js";
import { setupFavoriteEventListeners } from "./favoriteHandler.js";
import { setupTabEventListeners } from "./tabHandler.js";
import { setupFilterEventListeners } from "./filterHandler.js";

let selectedRestaurantId = null;
let eventListenersAttached = false;

export function handleRestaurantClick(e) {
  const $clickedItem = e.target.closest(".restaurant");

  if (!$clickedItem || $clickedItem.classList.contains("modal-restaurant")) {
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
  e.stopPropagation(); // 이벤트 버블링 방지

  const $restaurantList = document.querySelector(".restaurant-list");
  const $restaurantItems = $restaurantList.querySelectorAll(".restaurant");

  $restaurantItems.forEach((item) => {
    if (Number(item.dataset.restaurantId) === Number(selectedRestaurantId)) {
      item.remove();
    }
  });

  // 모달 제거 전에 이벤트 리스너 정리
  removeAllModalEventListeners();
  removeModal();

  // 모달이 닫힌 후 모든 이벤트 리스너 재설정
  setTimeout(() => {
    resetAllEventListeners();
  }, 10);
}

function handleCloseModal(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation(); // 이벤트 버블링 방지
  }

  // 모달 제거 전에 이벤트 리스너 정리
  removeAllModalEventListeners();
  removeModal();

  // 모달이 닫힌 후 모든 이벤트 리스너 재설정
  setTimeout(() => {
    resetAllEventListeners();
  }, 10);
}

function handleModalBackdropClick(e) {
  e.preventDefault();
  e.stopPropagation(); // 이벤트 버블링 방지

  // 모달 제거 전에 이벤트 리스너 정리
  removeAllModalEventListeners();
  removeModal();
  selectedRestaurantId = null;

  // 모달이 닫힌 후 모든 이벤트 리스너 재설정
  setTimeout(() => {
    resetAllEventListeners();
  }, 10);
}

// 모든 이벤트 리스너를 재설정하는 함수
function resetAllEventListeners() {
  setupTabEventListeners();
  setupRestaurantItemEventListeners();
  setupFilterEventListeners();
  setupFavoriteEventListeners();
}

// 모달의 모든 이벤트 리스너를 제거하는 함수
function removeAllModalEventListeners() {
  if (!eventListenersAttached) return;

  const $deleteButton = document.querySelector("#delete--restaurant");
  const $closeButton = document.querySelector("#close--modal");
  const $modalBackdrop = document.querySelector(".modal-backdrop");

  if ($deleteButton) {
    $deleteButton.removeEventListener("click", handleDeleteRestaurant);
  }

  if ($closeButton) {
    $closeButton.removeEventListener("click", handleCloseModal);
  }

  if ($modalBackdrop) {
    $modalBackdrop.removeEventListener("click", handleModalBackdropClick);
  }

  eventListenersAttached = false;
}

export function setupRestaurantItemEventListeners() {
  const $restaurantItems = document.querySelectorAll(
    ".restaurant:not(.modal-restaurant)",
  );

  $restaurantItems.forEach((item) => {
    // 클릭 이벤트를 한 번만 추가하기 위해 기존 리스너 제거
    item.removeEventListener("click", handleRestaurantClick);
    item.addEventListener("click", handleRestaurantClick);
  });
}

export function setupAddDetailtModal($container, selectedRestaurant) {
  // 새 모달 추가 전에 기존 모달 제거
  const existingModal = document.querySelector(".modal");
  if (existingModal) {
    removeAllModalEventListeners();
    existingModal.remove();
  }

  AddDetailModal($container, selectedRestaurant);

  // 모달 내부 요소에 이벤트 리스너 추가
  const $deleteButton = document.querySelector("#delete--restaurant");
  const $closeButton = document.querySelector("#close--modal");
  const $modalBackdrop = document.querySelector(".modal-backdrop");

  if ($deleteButton) {
    $deleteButton.addEventListener("click", handleDeleteRestaurant);
  } else {
    console.warn("삭제 버튼을 DOM에서 찾을 수 없습니다.");
  }

  if ($closeButton) {
    $closeButton.addEventListener("click", handleCloseModal);
  } else {
    console.warn("모달 닫기 버튼을 DOM에서 찾을 수 없습니다.");
  }

  if ($modalBackdrop) {
    $modalBackdrop.addEventListener("click", handleModalBackdropClick);
  }

  eventListenersAttached = true;
  setupFavoriteEventListeners();
}
