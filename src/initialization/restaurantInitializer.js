import RestaurantList from "../components/RestaurantList.js";
import { setupRestaurantItemEventListeners } from "../components/DetailModal.js";

export function initializeRestaurantList() {
  const $restaurantContainer = document.querySelector(
    ".restaurant-list-container",
  );

  if ($restaurantContainer) {
    RestaurantList($restaurantContainer);
    setupRestaurantItemEventListeners();
  } else {
    console.error("레스토랑 컨테이너 요소를 찾을 수 없습니다.");
  }
}
