import './Modal.css';

import { DOM } from '../../../dom';

class Modal {
  #modal: HTMLDivElement;
  #modalContainer!: HTMLDivElement;
  #modalBackdrop!: HTMLDivElement;

  constructor() {
    this.#modal = this.#createModal();
    this.#bindEvents();
  }

  #createModal(): HTMLDivElement {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'modal--open');
    modal.classList.toggle('modal--open');

    this.#modalBackdrop = document.createElement('div');
    this.#modalBackdrop.classList.add('modal-backdrop');

    this.#modalContainer = document.createElement('div');
    this.#modalContainer.classList.add('modal-container');

    modal.appendChild(this.#modalBackdrop);
    modal.appendChild(this.#modalContainer);

    if (DOM.APP) {
      DOM.APP.appendChild(modal);
    } else {
      console.error('DOM.APP element not found');
    }

    return modal;
  }

  #bindEvents(): void {
    this.#modalBackdrop.addEventListener('click', () => {
      this.#handleToggleModal();
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.#checkModalOpen()) {
        this.#handleToggleModal();
      }
    });
  }

  addElementToModalContainer(element: HTMLElement): void {
    this.#modalContainer.appendChild(element);
  }

  toggleModal(): void {
    this.#modal.classList.toggle('modal--open');
    document.body.style.overflow = this.#modal.classList.contains('modal--open') ? 'hidden' : '';
  }

  #checkModalOpen(): boolean {
    return this.#modal.classList.contains('modal--open');
  }

  #handleToggleModal(): void {
    this.toggleModal();
  }

  getElement(): HTMLDivElement {
    return this.#modal;
  }
}

export default Modal;
