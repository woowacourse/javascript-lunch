import $restaurantDetailContent from "../restaurant/restaurant-detail-content.ts";
import { Restaurant } from "../../data/models/restaurant.ts";
import { currentRestaurantData, saveRestaurantsToLocalStorage } from "../../data/storage/restaurantStorage.ts";

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

export const handleDeleteRestaurant = (id: number): void => {
  const updatedRestaurants = currentRestaurantData.filter(
    (restaurant: { dataId: number }) => restaurant.dataId !== id
  );

  saveRestaurantsToLocalStorage(updatedRestaurants);
  location.reload();
};

const $restaurantDetailModal = (restaurant: Restaurant): HTMLDivElement => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("restaurant-detail-modal");

  const background = document.createElement("div");
  background.classList.add("modal-backdrop");
  wrapper.appendChild(background);

  const container = document.createElement("div");
  container.classList.add("modal-container");

  const info = $restaurantDetailContent(restaurant);
  container.appendChild(info);

  wrapper.appendChild(container);

  // 모달 닫기 이벤트
  background.addEventListener("click", () => {
    handleRestaurantDetailModalClose();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") handleRestaurantDetailModalClose();
  });

  return wrapper;
};

export default $restaurantDetailModal;
