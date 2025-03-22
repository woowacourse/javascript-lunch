import { restaurantStore } from "../store/restaurantStore.js";
import RestaurantItem from "./RestaurantItem.js";
import { setupRestaurantItemEventListeners } from "./DetailModal.js";
import { setupFavoriteEventListeners } from "../handlers/favoriteHandler.js";

export default function RestaurantList(
  restaurants = restaurantStore.getRestaurants(),
) {
  const restaurantItemsHTML = restaurants
    .map((restaurant) => RestaurantItem(restaurant))
    .join("");

  const listHTML = `
    <ul class="restaurant-list">
      ${restaurantItemsHTML}
    </ul>
  `;

  function render(container) {
    container.insertAdjacentHTML("beforeend", listHTML);
    setupRestaurantItemEventListeners();
    setupFavoriteEventListeners();
    return container.querySelector(".restaurant-list");
  }

  return {
    render,
  };
}
