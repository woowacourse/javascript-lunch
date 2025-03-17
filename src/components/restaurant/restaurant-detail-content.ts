import $buttonContainer from "../layout/button-container.ts";
import $button from "../common/button.ts";
import $favoriteButton from "../common/favorite-button.ts";
import { Restaurant } from "../../data/models/restaurant.ts";
import { UI_CONFIG } from "../../constants/uiConfig.ts";
import { saveRestaurantsToLocalStorage, currentRestaurantData } from "../../data/storage/restaurantStorage.ts";

const $restaurantDetailContent = (restaurant: Restaurant): HTMLDivElement => {
  const info = document.createElement("div");
  info.classList.add("restaurant__info");

  // 카테고리 아이콘 + 즐겨찾기 버튼
  const restaurantHeader = document.createElement("div");
  restaurantHeader.classList.add("restaurant-header");

  const iconContainer = document.createElement("div");
  iconContainer.classList.add("restaurant_detail_category");

  const categoryIcon = document.createElement("img");
  categoryIcon.src = restaurant.categoryIcon;
  categoryIcon.alt = `${restaurant.categoryTitle} icon`;

  iconContainer.appendChild(categoryIcon);
  restaurantHeader.appendChild(iconContainer);
  const favButton = $favoriteButton({
    isFavorite: restaurant.isFavorite,
    className: ["button-favorite"],
  });
  favButton.setAttribute("data-restaurant-id", restaurant.dataId.toString());
  restaurantHeader.appendChild(favButton);

  favButton.addEventListener("mouseover", () => {
    if (!restaurant.isFavorite) favButton.src = "images/star-filled.png";
  });

  favButton.addEventListener("mouseout", () => {
    if (!restaurant.isFavorite) favButton.src = "images/star-outline.png";
  });

  favButton.addEventListener("click", (e) => {
    e.stopPropagation();

    restaurant.isFavorite = !restaurant.isFavorite;
    favButton.src = restaurant.isFavorite
      ? "images/star-filled.png"
      : "images/star-outline.png";

    saveRestaurantsToLocalStorage(currentRestaurantData);
    location.reload();
  });

  info.appendChild(restaurantHeader);

  // 제목
  const title = document.createElement("h3");
  title.classList.add("restaurant__name", "text-subtitle");
  title.innerText = restaurant.name;
  info.appendChild(title);

  // 거리 정보
  const distance = document.createElement("span");
  distance.classList.add("restaurant_detail_distance", "text-body");
  distance.innerText = `캠퍼스로부터 ${restaurant.distance}분 내`;
  info.appendChild(distance);

  // 설명
  const description = document.createElement("p");
  description.classList.add("restaurant_detail_description", "text-body");
  description.innerText = restaurant.description;
  info.appendChild(description);

  // 링크
  const link = document.createElement("a");
  link.classList.add("restaurant_detail_link", "text-body");
  link.href = restaurant.link;
  link.innerText = restaurant.link;
  info.appendChild(link);

  const deleteButton = $button(UI_CONFIG.BUTTONS.DELETE);
  deleteButton.setAttribute("data-restaurant-id", restaurant.dataId.toString());
  const closeButton = $button(UI_CONFIG.BUTTONS.CLOSE);

  const submitCancelButtons = $buttonContainer({
    buttons: [deleteButton, closeButton],
  });

  info.appendChild(submitCancelButtons);

  return info;
};

export default $restaurantDetailContent;
