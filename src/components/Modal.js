import createElement from '../utils/createElement.js';
import { resetInput } from './RestaurantEnrollModal.js';

class Modal {
  #element;
  #modalDiv;

  constructor() {
    this.#element = this.initModal();
  }

  initModal() {
    const modalContainer = createElement({ tag: 'div', className: 'modal' });
    const modalBackdrop = createElement({ tag: 'div', className: 'modal-backdrop' });
    this.#modalDiv = createElement({ tag: 'div', className: 'modal-container' });

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
