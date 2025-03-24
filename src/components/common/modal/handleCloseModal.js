import { $ } from "../../../utils/dom";

export const modalCloseAndFilter = (renderRestaurants) => {
  renderRestaurants();
  modalClose();
};

export const modalClose = () => {
  const backDrop = $(".modal-backdrop");
  backDrop.classList.remove("open");
  backDrop.replaceChildren();
};
