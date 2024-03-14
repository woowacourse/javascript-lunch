interface Props {
  child: HTMLElement;
}

class Modal {
  #modal = document.createElement("div");
  #modalBackdrop = document.createElement("div");
  #modalContainer = document.createElement("div");

  constructor({ child }: Props) {
    this.#modal.classList.add("modal");
    this.#modalBackdrop.classList.add("modal-backdrop");
    this.#modalContainer.classList.add("modal-container");

    this.#modalContainer.appendChild(child);
    this.#modal.appendChild(this.#modalBackdrop);
    this.#modal.appendChild(this.#modalContainer);

    this.#modalBackdrop.addEventListener("click", this.toggle.bind(this));
  }

  get element() {
    return this.#modal;
  }

  toggle() {
    this.#modal.classList.toggle("modal--open");
  }
}

export default Modal;
