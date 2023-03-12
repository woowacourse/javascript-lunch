import addCloseModalCallback from "./features/addCloseModalCallback";
import createModal from "./UI/createModal";

class Modal {
  public readonly element: HTMLElement;

  constructor(id: string) {
    this.element = createModal(id);

    addCloseModalCallback(this);
  }

  open() {
    if (!this.element.classList.contains("modal--open")) {
      this.element.classList.add("modal--open");
    }
  }

  close() {
    if (this.element.classList.contains("modal--open")) {
      this.element.classList.remove("modal--open");
    }
  }
}

export default Modal;
