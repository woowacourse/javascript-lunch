import $buttonContainer from "../layout/button-container.ts";
import $button from "../common/button.ts";
import { Restaurant } from "../../data/restaurant.ts";
import { UI_CONFIG } from "../../constants/uiConfig.ts";
import $favoriteButton from "../common/favorite-button.ts";

const $restaurantDetailContent = (restaurant: Restaurant): HTMLDivElement => {
  const info = document.createElement("div");
  info.classList.add("restaurant__info");

  // 카테고리 아이콘 + 즐겨찾기 버튼
  const restaurantHeader = document.createElement("div");
  restaurantHeader.classList.add("restaurant-header");

  const iconContainer = document.createElement("div");
  iconContainer.classList.add("restaurant_datail_category");

  const categoryIcon = document.createElement("img");
  categoryIcon.src = restaurant.categoryIcon;
  categoryIcon.alt = `${restaurant.categoryTitle} icon`;

  iconContainer.appendChild(categoryIcon);
  restaurantHeader.appendChild(iconContainer);
  const favButton = $favoriteButton(UI_CONFIG.BUTTONS.FAVORITE);
  restaurantHeader.appendChild(favButton);

  favButton.addEventListener("mouseover", () => {
    favButton.src = "images/star-filled.png";
  });

  favButton.addEventListener("mouseout", () => {
    favButton.src = "images/star-outline.png";
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

  const submitCancelButtons = $buttonContainer({
    buttons: [
      $button(UI_CONFIG.BUTTONS.DELETE),
      $button(UI_CONFIG.BUTTONS.CLOSE),
    ],
  });

  info.appendChild(submitCancelButtons);

  return info;
};

export default $restaurantDetailContent;
