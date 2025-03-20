import { Restaurant } from "../../types/type.js";
import { StorageController } from "../../utils/storage.js";
import restaurantAddModal from "../../views/mainPage/components/modal/restaurantAddModal.js";
import restaurantDetailModal from "../../views/mainPage/components/modal/restaurantDetailModal.js";
import { openModal, closeModal } from "./modalController.js";

const restaurantStorage = new StorageController<Restaurant[]>("restaurants");

const handleRestaurantDetailModal = (target: HTMLElement) => {
  let currentTarget: HTMLElement | null = target;
  while (currentTarget && !currentTarget.classList.contains("restaurant")) {
    currentTarget = currentTarget.parentNode as HTMLElement | null;
  }
  if (!currentTarget) return;

  const currentRestaurantId = currentTarget.dataset.id;
  const restaurants: Restaurant[] = restaurantStorage.getStorage() ?? [];
  const restaurantData = restaurants.find(
    ({ id }) => id === currentRestaurantId
  );

  if (restaurantData) {
    openModal(() => restaurantDetailModal(restaurantData));
  }
};

const handleRestaurantAddModal = () => {
  openModal(restaurantAddModal);
};

const handleModalClose = (target: HTMLElement) => {
  if (
    target.closest(".modal-backdrop") ||
    target.closest(".button--secondary") ||
    target.closest(".button--close")
  ) {
    closeModal();
  }
};

export {
  handleRestaurantDetailModal,
  handleRestaurantAddModal,
  handleModalClose,
};
