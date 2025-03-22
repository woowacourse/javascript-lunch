import createElement from "../utils/createElement.js";

const Modal = () => {
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
};

export default Modal;
