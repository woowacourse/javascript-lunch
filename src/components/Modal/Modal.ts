class Modal {
  #modalElement = document.createElement('div');

  constructor() {
    this.#modalElement.classList.add('modal', 'modal--close');
    this.#generateBackdrop();
    this.#generateContainer();
  }

  #generateBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');

    this.#modalElement.appendChild(backdrop);
  }

  #generateContainer() {
    const container = document.createElement('div');
    container.classList.add('modal-container');

    this.#modalElement.appendChild(container);
  }

  get element() {
    return this.#modalElement;
  }
}

export default Modal;
