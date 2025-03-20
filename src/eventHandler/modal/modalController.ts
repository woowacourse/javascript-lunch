import { $ } from "../../utils/domHelpers.js";

const toggleModal = () => {
  const $modal = $("#restaurant-modal");
  $modal.classList.toggle("modal--open");

  document.body.style.overflow = $modal.classList.contains("modal--open")
    ? "hidden"
    : "auto";
};

export const openModal = (modalContent: () => void) => {
  toggleModal();
  modalContent();
};

export const closeModal = () => {
  toggleModal();
};
