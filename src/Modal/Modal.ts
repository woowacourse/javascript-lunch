import addCloseModalCallback from "./features/addCloseModalCallback";
import createModal from "./UI/createModal";

class Modal {
  public readonly element: HTMLElement;

  constructor(id: string) {
    this.element = createModal(id);
    this.element.dataset.open = "false";

    addCloseModalCallback(this);
  }

  open() {
    if (this.element.dataset.open === "false") {
      this.element.dataset.open = "true";
    }
  }

  close() {
    if (this.element.dataset.open === "true") {
      this.element.dataset.open = "false";
    }
  }
}

export default Modal;
