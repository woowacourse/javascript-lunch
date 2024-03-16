class Modal {
  #modal = document.createElement('div');

  constructor(container) {
    const modalBackDrop = document.createElement('div');

    this.#modal.classList.add('modal');
    modalBackDrop.classList.add('modal-backdrop');

    this.#modal.appendChild(modalBackDrop);

    this.#modal.appendChild(container);
  }

  toggle() {
    this.#modal.classList.toggle('modal--open');
  }

  getElement() {
    return this.#modal;
  }
}

export default Modal;

/*
<div class="modal">
    <div class="modal-backdrop"></div>
    <div class="modal-container">
</div>
</div>
*/
