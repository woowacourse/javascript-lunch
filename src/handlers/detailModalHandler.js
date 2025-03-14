import { AddDetailModal } from "../components/AddDetailModal.js";

export function handleRestaurantClick() {
  const $appContainer = document.getElementById("app");
  AddDetailModal($appContainer);
}

export function setupRestaurantItemEventListeners() {
  const $restaurantItems = document.querySelectorAll(".restaurant");
  $restaurantItems.forEach((item) => {
    item.addEventListener("click", handleRestaurantClick);
  });
}
