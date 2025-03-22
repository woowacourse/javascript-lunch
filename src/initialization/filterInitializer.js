import RestaurantFilterContainer from "../components/RestaurantFilterContainer.js";
import { setupFavoriteEventListeners } from "../handlers/favoriteHandler.ts";

export function initializeFilters() {
  const $filterContainer = document.querySelector(
    ".restaurant-filter-container",
  );

  if ($filterContainer) {
    const filterComponent = RestaurantFilterContainer();
    filterComponent.render($filterContainer);
    setupFavoriteEventListeners();
  } else {
    console.error("필터 컨테이너 요소를 찾을 수 없습니다.");
  }
}
