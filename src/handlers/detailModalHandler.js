import { AddDetailModal } from "../components/AddDetailModal.js";
import { initialRestaurants } from "../data/initialRestaurants.js";

export function handleRestaurantClick(e) {
  const $clickedItem = e.target.closest(".restaurant");
  const { restaurantId } = $clickedItem.dataset;

  const selectedRestaurant = initialRestaurants.find(
    (restaurant) => restaurant.id === Number(restaurantId),
  );

  const $appContainer = document.getElementById("app");
  AddDetailModal($appContainer, selectedRestaurant);
}

export function setupRestaurantItemEventListeners() {
  const $restaurantItems = document.querySelectorAll(".restaurant");
  $restaurantItems.forEach((item) => {
    item.addEventListener("click", handleRestaurantClick);
  });
}
