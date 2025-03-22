import createElement from '../../utils/createElement.js';

class Modal {
  #element;
  #modalDiv;
  #onClose;

  constructor(onClose) {
    this.#element = this.initModal();
    this.#onClose = onClose;
  }

  initModal() {
    const modalContainer = createElement({ tag: 'div', className: 'modal' });
    const modalBackdrop = createElement({ tag: 'div', className: 'modal-backdrop' });
    this.#modalDiv = createElement({ tag: 'div', className: 'modal-container' });

    modalBackdrop.addEventListener('click', () => {
      this.toggle();
    });

    modalContainer.append(modalBackdrop, this.#modalDiv);

    return modalContainer;
  }

  appendModalContent(content) {
    this.#modalDiv.replaceChildren();
    this.#modalDiv.appendChild(content);
  }

  toggle() {
    this.#element.classList.toggle('modal--open');

    if (!this.#element.classList.contains('modal--open') && this.#onClose) {
      this.#onClose();
    }
  }

  getElement() {
    return this.#element;
  }
}

export default Modal;
