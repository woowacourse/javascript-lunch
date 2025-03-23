import EventHandler from "../utils/EventHandler.ts";
import createHeaderView from "../view/createHeaderView.js";

class HeaderController {
  headerElement;
  modalElement;

  constructor(modalElement: HTMLDivElement) {
    this.headerElement = createHeaderView();
    this.modalElement = modalElement;

    this.registerEvents();
  }

  getHeaderElement() {
    return this.headerElement;
  }

  render(container: HTMLElement) {
    container.prepend(this.headerElement);
  }

  registerEvents() {
    const modalButtonElement = this.headerElement.querySelector("button.gnb__button");
    if (modalButtonElement) {
      modalButtonElement.addEventListener("click", () => EventHandler.modalToggle(this.modalElement));
    }
  }
}

export default HeaderController;
