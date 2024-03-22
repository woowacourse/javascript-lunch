import generateModal from "./generateModal";

class Modal {
  element;

  constructor(children: HTMLElement[]) {
    this.element = generateModal(children);
  }

  toggle() {
    this.element.classList.toggle("modal--open");
  }
}

export default Modal;
