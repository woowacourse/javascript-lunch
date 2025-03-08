import createElement from '../utils/createElement.js';
import { resetInput } from './RestaurantEnrollModal.js';

class Modal {
  #element;
  #modalDiv;

  constructor() {
    this.#element = this.initModal();
  }

  initModal() {
    const modalContainer = createElement('div', 'modal');
    const modalBackdrop = createElement('div', 'modal-backdrop');
    this.#modalDiv = createElement('div', 'modal-container');

    modalContainer.append(modalBackdrop, this.#modalDiv);

    return modalContainer;
  }

  appendModalContent(content) {
    this.#modalDiv.appendChild(content);
  }

  toggle() {
    this.#element.classList.toggle('modal--open');

    if (!this.#element.classList.contains('modal--open')) {
      resetInput();
    }
  }

  getElement() {
    return this.#element;
  }
}

export default Modal;
