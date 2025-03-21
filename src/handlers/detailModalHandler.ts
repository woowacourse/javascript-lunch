import { Restaurant } from "../../types/Restaurant.ts";
import { AddDetailModal } from "../components/DetailModal.js"
import { restaurantStore } from "../store/restaurantStore.ts";


export function handleRestaurantClick(e: MouseEvent): void {
  const $clickedItem = (e.target as HTMLElement).closest(".restaurant") as HTMLElement | null;

  if (!$clickedItem || $clickedItem.classList.contains("modal-restaurant")) {
    return;
  }
  const restaurantId = $clickedItem.dataset.restaurantId;
  if (!restaurantId) return;
  
  //FIX: 여기서 값을 못찾음.
  const selectedRestaurant = restaurantStore.getById(restaurantId);
  if (selectedRestaurant) {
    const $appContainer = document.getElementById("app");
    if ($appContainer) {
      AddDetailModal($appContainer, selectedRestaurant);
    }
  }
}

export function setupRestaurantItemEventListeners(): void {
  const $restaurantItems = document.querySelectorAll(
    ".restaurant:not(.modal-restaurant)"
  );

  $restaurantItems.forEach((item) => {
    item.removeEventListener("click", handleRestaurantClick as EventListener);
    item.addEventListener("click", handleRestaurantClick as EventListener);
  });
}
