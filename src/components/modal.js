import modalRenderer from "../render/modalRenderer.js";
import storeRenderer from "../render/storeRenderer.js";
import createElement from "../utils/createElement.js";

const Modal = (storeList, classList) => {
  const modal = createElement({
    tag: "div",
    classList: ["modal", ...classList],
  });
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

  document
    .querySelector(".modal-backdrop")
    .addEventListener("click", () => modalRenderer.closeModal());
};

export default Modal;
