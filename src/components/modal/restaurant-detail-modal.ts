import $button from "../common/button.ts";
import $buttonContainer from "../layout/button-container.ts";
import $restaurantDetailContent from "../restaurant/restaurant-detail-content.ts";
import { UI_CONFIG } from "../../constants/uiConfig.ts";
import { Restaurant } from "../../data/restaurant.ts";

export const handleRestaurantDetailModalClose = (): void => {
  const modal = document.querySelector(".restaurant-detail-modal");
  if (!modal) return;
  modal.classList.remove("modal--open");
  document.querySelector("main")?.removeChild(modal);
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

  // 콘텐츠 한 번에 담는 div
  const info = $restaurantDetailContent(restaurant);

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
