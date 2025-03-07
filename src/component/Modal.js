import { DOM } from "../utils/dom.js";
import { $ } from "../utils/querySelectors.js";
import AddLunchModalForm from "./AddLunchModalForm.js";

const Modal = {
  create() {
    const modalElement = document.createElement("div");
    modalElement.classList.add("modal");
    modalElement.appendChild(this.createModalBackdrop());
    modalElement.appendChild(this.createModalContainer());

    return modalElement;
  },

  createModalBackdrop() {
    const modalBackdropElement = document.createElement("div");
    modalBackdropElement.classList.add("modal-backdrop");
    modalBackdropElement.addEventListener("click", () => Modal.close());

    return modalBackdropElement;
  },

  createModalContainer() {
    const modalContainerElement = document.createElement("div");
    modalContainerElement.classList.add("modal-container");
    modalContainerElement.appendChild(AddLunchModalForm.create());

    return modalContainerElement;
  },

  open() {
    $(".modal").classList.add("modal--open");
  },

  close() {
    $(".modal").classList.remove("modal--open");
  },
};

export default Modal;
