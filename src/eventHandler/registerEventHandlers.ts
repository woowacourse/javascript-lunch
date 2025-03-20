import {
  handleRestaurantDetailModal,
  handleRestaurantAddModal,
  handleModalClose,
} from "./modal/restaurantModalHandler.ts";
import handleDeleteRestaurant from "./restaurant/deleteRestaurant.ts";

const registerEventHandlers = () => {
  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (target.closest(".restaurant")) {
      handleRestaurantDetailModal(target);
    }

    if (target.closest(".gnb__button")) {
      handleRestaurantAddModal();
    }

    if (target.closest(".button--delete")) {
      handleDeleteRestaurant(target);
    }

    handleModalClose(target);
  });
};

export default registerEventHandlers;
