import addCloseModalCallback from "./features/addCloseModalCallback";
import addBackdrop from "./UI/addBackdrop";
import addContainer from "./UI/addContainer";

class Modal {
  public readonly element: HTMLElement;

  constructor(id: string) {
    this.element = document.createElement("div");
    this.element.setAttribute("class", "modal");
    if (id) this.element.setAttribute("id", id);

    addBackdrop(this);
    addContainer(this);
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
