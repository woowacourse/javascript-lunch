import { restaurantStore } from "../store/restaurantStore.js";
import RestaurantItem from "./RestaurantItem.js";
import { setupRestaurantItemEventListeners } from "./DetailModal.js";
import { setupFavoriteEventListeners } from "../handlers/favoriteHandler.js";

export default function RestaurantList(
  restaurants = restaurantStore.getRestaurants(),
) {
  const currentRestaurants = [...restaurants];

  function generateHTML() {
    return `
      <ul class="restaurant-list">
        ${currentRestaurants.map((restaurant) => RestaurantItem(restaurant)).join("")}
      </ul>
    `;
  }

  function render(container) {
    container.insertAdjacentHTML("beforeend", generateHTML());
    setupRestaurantItemEventListeners();
    setupFavoriteEventListeners();
    return container.querySelector(".restaurant-list");
  }

  function rerender(filteredRestaurants = null) {
    const $restaurantList = document.querySelector(".restaurant-list");
    if (!$restaurantList) return;

    if (filteredRestaurants) {
      currentRestaurants = filteredRestaurants;
    } else {
      currentRestaurants = restaurantStore.getRestaurants();
    }

    $restaurantList.innerHTML = currentRestaurants
      .map((restaurant) => RestaurantItem(restaurant))
      .join("");

    setupRestaurantItemEventListeners();
    setupFavoriteEventListeners();
  }
  return {
    render,
    rerender,
  };
}
