import { applyFilter } from "./filterHandler.js";
import { restaurantStore } from "../store/restaurantStore.ts";
import { rerenderRestaurantList } from "./restaurantHandler.ts";

export function handleFavoriteClick(e: MouseEvent): void {
  e.stopPropagation();

  const $favoriteButton = (e.target as HTMLElement).closest(".favorite-button") as HTMLElement;
  const restaurantId = $favoriteButton.dataset.restaurantId;
  
  if (!restaurantId) return;

  const restaurant = restaurantStore.getById(restaurantId);
  if (restaurant) {
    restaurant.favorites = !restaurant.favorites;
    restaurantStore.updateRestaurant(restaurantId, { favorites: restaurant.favorites });

    // UI 업데이트
    const $starImg = $favoriteButton.querySelector("img");
    if ($starImg) {
      $starImg.src = `./${restaurant.favorites ? "fill-star" : "blank-star"}.png`;
    }
    
  }

  applyFilter();
}

export function setupFavoriteEventListeners(): void {
  const $favoriteButtons = document.querySelectorAll(".favorite-button");
  $favoriteButtons.forEach((button) => {
    button.removeEventListener("click", handleFavoriteClick as EventListener);
    button.addEventListener("click", handleFavoriteClick as EventListener);
  });
}
