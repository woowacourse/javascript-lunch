import { applyFilter } from "./filterHandler.js";

export function handleFavoriteToggle(e) {
  const button = e.currentTarget;
  const restaurantItem = button.closest(".restaurant");
  const starIcon = button.querySelector("img");

  if (!restaurantItem) return;

  // 일단 별을 누른 해당 레스토랑의 favorite 값을 swap한다.
  const isFavorite = restaurantItem.dataset.favorites === "true";
  const newFavoriteState = !isFavorite;
  restaurantItem.dataset.favorites = newFavoriteState ? "true" : "false";

  // 아이콘 시각적으로 변경하기
  if (starIcon) {
    starIcon.src = newFavoriteState ? "./fill-star.png" : "./blank-star.png";
    starIcon.classList.add("star-animation");
    setTimeout(() => {
      starIcon.classList.remove("star-animation");
    }, 300);
  }

  const { restaurantId } = button.dataset;
  if (restaurantId) {
    updateOriginalData(parseInt(restaurantId), newFavoriteState);
  }
  // 한번더 정렬한다.
  applyFilter();
}

// initial의 값도 바꾼다.
function updateOriginalData(restaurantId, isFavorite) {
  const restaurant = initialRestaurants.find((r) => r.id === restaurantId);
  if (restaurant) {
    restaurant.favorites = isFavorite;
  }
}
export function setupFavoriteEventListeners() {
  const favoriteButtons = document.querySelectorAll(".favorite-button");
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", handleFavoriteToggle);
  });
}
