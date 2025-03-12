import RestaurantList from "../components/RestaurantList.js";

export function initializeRestaurantList() {
  const $restaurantListContainer = document.querySelector(
    ".restaurant-list-container",
  );

  if ($restaurantListContainer) {
    RestaurantList($restaurantListContainer);
  } else {
    console.warn("레스토랑 리스트 컨테이너를 DOM에서 찾을 수 없습니다.");
  }
}
