class Modal {
  #visible = false;

  #modal;
  #modalBackDrop;
  #modalContainer;

  constructor({ element }) {
    this.#modal = document.createElement("div");
    this.#modalBackDrop = document.createElement("div");
    this.#modalContainer = document.createElement("div");

    this.#modalBackDrop.classList.add("modal-backdrop");
    this.#modalBackDrop.addEventListener("click", () => {
      this.toggle();
    });

    this.#modalContainer.classList.add("modal-container");
    this.#modalContainer.append(element);
    this.#modal.classList.add("modal");

    this.#modal.append(this.#modalBackDrop);
    this.#modal.append(this.#modalContainer);
  }

  toggle() {
    this.#visible = !this.#visible;
    this.#modal.classList.toggle("modal--open");
  }

  get rendered() {
    return this.#modal;
  }
}

export default Modal;
