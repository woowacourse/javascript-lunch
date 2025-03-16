import { applyFilter } from "./filterHandler.ts";
import { initialRestaurants } from "../data/initialRestaurants.ts";
import { storeRestaurants } from "../utils/localStorage.ts";
import { Restaurant } from "../../types/Restaurant.ts";
import { rerenderRestaurantList } from "./restaurantHandler.ts";

export function handleFavoriteClick(e : MouseEvent) : void {
  e.stopPropagation();

  const $favoriteButton = (e.target as HTMLElement).closest(".favorite-button") as HTMLElement;
  const restaurantId = Number($favoriteButton.dataset.restaurantId);

  const updatedRestaurants : Restaurant[] = initialRestaurants.map((restaurant) => {
    if (restaurant.id === restaurantId) {
      return {
        ...restaurant,
        favorites: !restaurant.favorites,
      };
    }
    return restaurant;
  });

  Object.assign(initialRestaurants, updatedRestaurants);

  storeRestaurants(updatedRestaurants);

  // UI 업데이트
  const $starImg = $favoriteButton.querySelector("img") as HTMLImageElement;
  const $restaurantElement = $favoriteButton.closest(".restaurant") as HTMLElement;
  const newFavoriteState = !(
    $restaurantElement.dataset.favorites === "true"
  );
  $starImg.src = `./${newFavoriteState ? "fill-star" : "blank-star"}.png`;
  $restaurantElement.dataset.favorites =
    String(newFavoriteState);

  rerenderRestaurantList();
  applyFilter();
}

export function setupFavoriteEventListeners() {
  const $favoriteButtons = document.querySelectorAll(".favorite-button") ;
  $favoriteButtons.forEach((button) => {
    button.addEventListener("click", handleFavoriteClick as EventListener);
  });
}
