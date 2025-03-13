import RestaurantFilterContainer from "../components/RestaurantFilterContainer.js";
import { setupFilterEventListeners } from "../handlers/filterHandler.js";

export function initializeFilters() {
  const $filterContainer = document.querySelector(
    ".restaurant-filter-container",
  );

  if ($filterContainer) {
    RestaurantFilterContainer($filterContainer);

    setupFilterEventListeners();
  } else {
    console.error("필터 컨테이너 요소를 찾을 수 없습니다.");
  }
}
