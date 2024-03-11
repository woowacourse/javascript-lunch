import { MODAL_EVENT, MODAL_EVENT_ACTION } from "../constants/event";
import { $ } from "../utils/selector";

export const setRestaurantHeaderEvent = () => {
  const openRestaurantFormModal = () => {
    document.dispatchEvent(
      new CustomEvent(MODAL_EVENT.restaurantFormModalAction, {
        bubbles: true,
        detail: { action: MODAL_EVENT_ACTION.open },
      })
    );
  };

  $("#add-button")?.addEventListener("click", openRestaurantFormModal);
};
