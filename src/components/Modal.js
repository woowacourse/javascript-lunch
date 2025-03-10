import { DOM } from '../dom.js';

class Modal {
  #modal;
  #modalContainer;
  
  constructor() {
    this.#modal = this.#createModal();
  }

  #createModal = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'modal--open');
    modal.classList.toggle('modal--open');

    const modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('modal-backdrop');

    this.#modalContainer = document.createElement('div');
    this.#modalContainer.classList.add('modal-container');

    modal.appendChild(modalBackdrop);
    modal.appendChild(this.#modalContainer);
    DOM.APP.appendChild(modal);
    return modal;
  };

  addElementToModalContainer = (element) => {
    this.#modalContainer.appendChild(element);
  };

  toggleModal = () => {
    this.#modal.classList.toggle('modal--open');
    document.body.style.overflow = this.#modal.classList.contains('modal--open') ? 'hidden' : '';
  };

  getModalContainerForm = () => {
    return this.#modal.querySelector('.modal-container form');
  }

  checkModalOpen = () => {
    return this.#modal.classList.contains('modal--open');
  }
}

export default Modal;
