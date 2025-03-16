import RestaurantFilterContainer from "../components/RestaurantFilterContainer.js";
import { setupFilterEventListeners } from "../handlers/filterHandler.ts";
import { setupFavoriteEventListeners } from "../handlers/favoriteHandler.ts";

export function initializeFilters() {
  const $filterContainer = document.querySelector(
    ".restaurant-filter-container",
  );

  if ($filterContainer) {
    RestaurantFilterContainer($filterContainer);
    setupFilterEventListeners();
    setupFavoriteEventListeners();
  } else {
    console.error("필터 컨테이너 요소를 찾을 수 없습니다.");
  }
}
