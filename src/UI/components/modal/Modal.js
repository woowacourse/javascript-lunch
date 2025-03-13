import { DOM } from '../../../dom.js';
class Modal {
  #modal;
  #modalContainer;
  #modalBackdrop;
  constructor() {
    this.#modal = this.#createModal();
    this.#bindEvents();
  }

  #createModal = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'modal--open');
    modal.classList.toggle('modal--open');

    this.#modalBackdrop = document.createElement('div');
    this.#modalBackdrop.classList.add('modal-backdrop');

    this.#modalContainer = document.createElement('div');
    this.#modalContainer.classList.add('modal-container');

    modal.appendChild(this.#modalBackdrop);
    modal.appendChild(this.#modalContainer);
    DOM.APP.appendChild(modal);
    return modal;
  };

  #bindEvents = () => {
    this.#modalBackdrop.addEventListener('click', () => {
      this.#handleToggleModal();
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape' && this.#checkModalOpen()) {
        this.#handleToggleModal();
      }
    });
  };

  addElementToModalContainer = (element) => {
    this.#modalContainer.appendChild(element);
  };

  toggleModal = () => {
    this.#modal.classList.toggle('modal--open');
    document.body.style.overflow = this.#modal.classList.contains('modal--open') ? 'hidden' : '';
  };

  #checkModalOpen = () => {
    return this.#modal.classList.contains('modal--open');
  };

  #handleToggleModal = () => {
    this.toggleModal();
  };
}

export default Modal;
