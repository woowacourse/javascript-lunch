import RestaurantDetailedModal from "../RestaurantDetailedModal";

const addDeleteButtonCallback = (modal: RestaurantDetailedModal) => {
  modal.element.querySelector(".button--secondary")?.addEventListener("click", () => {
    modal.element.dispatchEvent(new CustomEvent("deleteRestaurant", {
      bubbles: true,
      detail: { info: modal.info }
    }));
    modal.close();
  })
};

export default addDeleteButtonCallback;
