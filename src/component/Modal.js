import { $, $$ } from "../utils/querySelectors.js";

const Modal = {
  create(id, modalContent) {
    const modalElement = document.createElement("div");
    modalElement.id = id;
    modalElement.classList.add("modal");
    modalElement.appendChild(this.createModalBackdrop(id));
    modalElement.appendChild(this.createModalContainer(modalContent));

    return modalElement;
  },

  createModalBackdrop(id) {
    const modalBackdropElement = document.createElement("div");
    modalBackdropElement.classList.add("modal-backdrop");
    modalBackdropElement.addEventListener("click", () => Modal.close(id));

    return modalBackdropElement;
  },

  createModalContainer(modalContent) {
    const modalContainerElement = document.createElement("div");
    modalContainerElement.classList.add("modal-container");
    modalContainerElement.appendChild(modalContent);

    return modalContainerElement;
  },

  open(id) {
    $(`.modal[id=${id}]`).classList.add("modal--open");
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") Modal.close(id);
    });
  },

  close(id) {
    $(`.modal[id=${id}]`).classList.remove("modal--open");
    document.removeEventListener("keydown", (e) => {
      if (e.key === "Escape") Modal.close(id);
    });
  },

  reset(id) {
    $$(`.modal[id=${id}] input`).forEach((input) => (input.value = ""));
    $$(`.modal[id=${id}] select`).forEach((select) => (select.value = ""));
    $$(`.modal[id=${id}] textarea`).forEach(
      (textarea) => (textarea.value = "")
    );
  },
};

export default Modal;
