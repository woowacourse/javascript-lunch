import modalRenderer from "../render/modalRenderer.js";
import storeRenderer from "../render/storeRenderer.js";
import createElement from "../utils/createElement.js";

const Modal = (storeList) => {
  const modal = createElement({ tag: "div", classList: ["modal"] });
  const modalBackdrop = createElement({
    tag: "div",
    classList: ["modal-backdrop"],
  });
  const modalContainer = createElement({
    tag: "div",
    classList: ["modal-container"],
  });

  modal.appendChild(modalBackdrop);
  modal.appendChild(modalContainer);

  document.querySelector("main").appendChild(modal);

  modalRenderer.addForm();

  document
    .querySelector(".modal-form")
    .addEventListener("submit", (e) => storeRenderer.updateStore(storeList, e));

  document
    .querySelector(".modal-backdrop")
    .addEventListener("click", modalRenderer.closeModal);
};

export default Modal;
