import $button from "../common/button.ts";
import $buttonContainer from "../layout/button-container.ts";
import { UI_CONFIG } from "../../constants/uiConfig.ts";
import { Restaurant } from "../../data/restaurant.ts";

export const handleRestaurantDetailModalClose = (): void => {
    const modal = document.querySelector(".restaurant-detail-modal");
    if (!modal) return;
  
    modal.classList.remove("modal--open");
  };

  export const handleRestaurantDetailModalOpen = (): void => {
    const modal = document.querySelector(".restaurant-detail-modal");
    if (!modal) return;
  
    modal.classList.add("modal--open");
  };
  

const $restaurantDetailModal = (restaurant: Restaurant): HTMLDivElement => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("restaurant-detail-modal");

  const background = document.createElement("div");
  background.classList.add("modal-backdrop");
  wrapper.appendChild(background);

  const container = document.createElement("div");
  container.classList.add("modal-container");

  // 카테고리 아이콘
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("restaurant__category");

  const categoryIcon = document.createElement("img");
  categoryIcon.src = restaurant.categoryIcon;
  categoryIcon.alt = `${restaurant.categoryTitle} icon`;

  iconContainer.appendChild(categoryIcon);
  container.appendChild(iconContainer);

  // 콘텐츠 한 번에 담는 div
  const info = document.createElement("div");
  info.classList.add("restaurant__info");

  // 제목
  const title = document.createElement("h3");
  title.classList.add("restaurant__name", "text-subtitle");
  title.innerText = restaurant.name;
  info.appendChild(title);

  // 거리 정보
  const distance = document.createElement("span");
  distance.classList.add("restaurant__distance", "text-body");
  distance.innerText = `캠퍼스로부터 ${restaurant.distance}분 내`;
  info.appendChild(distance);

  // 설명
  const description = document.createElement("p");
  description.classList.add("restaurant__description", "text-body");
  description.innerText = restaurant.description;
  info.appendChild(description);

  // 링크
  const link = document.createElement("a");
  link.href = restaurant.link;
  link.innerText = restaurant.link;
  info.appendChild(link);

  container.appendChild(info);

  const submitCancelButtons = $buttonContainer({
    buttons: [
      $button(UI_CONFIG.BUTTONS.DELETE),
      $button(UI_CONFIG.BUTTONS.CLOSE),
    ],
  });

  container.appendChild(submitCancelButtons);
  wrapper.appendChild(container);

  // 모달 닫기 이벤트 추가
  background.addEventListener("click", () => {
    handleRestaurantDetailModalClose();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") handleRestaurantDetailModalClose();
  });

  return wrapper;
};

export default $restaurantDetailModal;
