import RestaurantDetailedModal from "../RestaurantDetailedModal";

const addCloseButtonCallback = (modal: RestaurantDetailedModal) => {
  modal.element.querySelector(".button--primary")?.addEventListener("click", () => {
    modal.close();
  })
};

export default addCloseButtonCallback;
