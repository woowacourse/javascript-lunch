import type { Restaurant } from "../../types/type";
import { getElement } from "../../utils/dom";
import { getRestaurantItem } from "../../utils/restaurant";
import createRestaurantDetail from "../restaurant/detail/restaurantDetail";
import createRestaurantForm from "../restaurant/form/restaurantForm";

function bottomSheetController() {
  const modal = getElement(".modal") as HTMLDialogElement;
  const modalContainer = getElement(".modal-container");

  function handleModalClose() {
    modal.close();
  }

  function openRestaurantDetailModal(RestaurantInfo: Restaurant) {
    modal.showModal();
    modalContainer.replaceChildren(createRestaurantDetail(RestaurantInfo));
  }

  function openRestaurantAddFormModal() {
    modal.showModal();
    modalContainer.replaceChildren(createRestaurantForm());
  }

  function handleBottomSheetToggle(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const restaurantAddButton = target.closest(".restaurant-add-button");
    if (restaurantAddButton) {
      openRestaurantAddFormModal();
    }

    const restaurantItem = target.closest(".restaurant");
    if (restaurantItem) {
      const dataId = (restaurantItem as HTMLLIElement).dataset.id as string;
      const restaurantData = getRestaurantItem(dataId);
      openRestaurantDetailModal(restaurantData);
    }

    const modalBackdrop = target.closest(".modal-backdrop");
    if (modalBackdrop) {
      modal.close();
    }
  }

  return {
    handleModalClose,
    handleBottomSheetToggle,
    openRestaurantDetailModal,
  };
}

export const {
  handleModalClose,
  handleBottomSheetToggle,
  openRestaurantDetailModal,
} = bottomSheetController();
