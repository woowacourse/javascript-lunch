import RestaurantInputModal from "../RestaurantInputModal"

const attachCloseModalCallback = (modal: RestaurantInputModal) => {
  modal
    .element
    .querySelector(".button--secondary")
    ?.addEventListener("click", () => {
      modal.close();
    });
};

export default attachCloseModalCallback;
