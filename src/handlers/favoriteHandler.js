import { applyFilter } from "./filterHandler.js";
import { initialRestaurants } from "../data/initialRestaurants.js";
import { storeRestaurants } from "../utils/localStorage.js";

export function handleFavoriteClick(e) {
  e.stopPropagation();

  const $favoriteButton = e.target.closest(".favorite-button");
  const restaurantId = Number($favoriteButton.dataset.restaurantId);

  const updatedRestaurants = initialRestaurants.map((restaurant) => {
    if (restaurant.id === restaurantId) {
      return {
        ...restaurant,
        favorites: !restaurant.favorites,
      };
    }
    return restaurant;
  });

  console.log(updatedRestaurants);

  // initialRestaurants 업데이트
  Object.assign(initialRestaurants, updatedRestaurants);

  // localStorage 업데이트
  storeRestaurants(updatedRestaurants);

  // UI 업데이트
  const $starImg = $favoriteButton.querySelector("img");
  const newFavoriteState = !(
    $favoriteButton.closest(".restaurant").dataset.favorites === "true"
  );
  $starImg.src = `./${newFavoriteState ? "fill-star" : "blank-star"}.png`;
  $favoriteButton.closest(".restaurant").dataset.favorites =
    String(newFavoriteState);

  applyFilter();
}

export function setupFavoriteEventListeners() {
  const $favoriteButtons = document.querySelectorAll(".favorite-button");
  $favoriteButtons.forEach((button) => {
    button.addEventListener("click", handleFavoriteClick);
  });
}
