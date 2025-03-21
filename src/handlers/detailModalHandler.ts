import { Restaurant } from "../../types/Restaurant.ts";
import { AddDetailModal } from "../components/DetailModal.js"


export function handleRestaurantClick(e: MouseEvent): void {
  const $clickedItem = (e.target as HTMLElement).closest(".restaurant") as HTMLElement | null;

  if (!$clickedItem || $clickedItem.classList.contains("modal-restaurant")) {
    return;
  }

  const restaurantId = $clickedItem.dataset.restaurantId;
  if (!restaurantId) return;
  
  import("../data/initialRestaurants.ts").then(({ initialRestaurants }) => {
    const selectedRestaurant = initialRestaurants.find(
      (restaurant) => restaurant.id === Number(restaurantId)
    );
    
    if (selectedRestaurant) {
      const $appContainer = document.getElementById("app");
      if ($appContainer) {
        AddDetailModal($appContainer, selectedRestaurant);
      }
    }
  });
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
