import { $ } from "./querySelector";

class Modal {
  #isOpen = false;

  open() {
    if (this.#isOpen) return;
    $(".modal")?.classList.add("modal--open");
    this.#isOpen = true;
  }

  close() {
    if (!this.#isOpen) return;
    $(".modal")?.classList.remove("modal--open");
    this.#isOpen = false;
  }
}

export default Modal;
