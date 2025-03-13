import { $ } from "../../../utils/dom";

export const modalCloseAndFilter = (filter) => {
  modalClose();
  filter();
};

export const modalClose = () => {
  const backDrop = $(".modal-backdrop");
  backDrop.classList.remove("open");
  backDrop.replaceChildren();
};
