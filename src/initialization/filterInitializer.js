import RestaurantFilterContainer from "../components/RestaurantFilterContainer.js";

export function initializeFilters() {
  const $filterContainer = document.querySelector(
    ".restaurant-filter-container",
  );

  if ($filterContainer) {
    RestaurantFilterContainer($filterContainer);
  } else {
    console.warn("필터 컨테이너를 DOM에서 찾을 수 없습니다.");
  }
}
