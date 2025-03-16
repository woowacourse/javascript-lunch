import EventHandler from "../utils/EventHandler.js";

function HeaderEventHandler(headerElement, modalElement) {
  const modalButtonElement = headerElement.querySelector("button.gnb__button");
  if (modalButtonElement) {
    modalButtonElement.addEventListener("click", () => EventHandler.modalToggle(modalElement));
  }
}

export default HeaderEventHandler;
