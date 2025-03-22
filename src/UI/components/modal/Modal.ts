import './Modal.css';

class Modal {
  #modal: HTMLDivElement;
  #modalContainer: HTMLDivElement;
  #modalBackdrop: HTMLDivElement;
  #onClose: () => void;

  constructor(onClose: () => void) {
    this.#onClose = onClose;
    this.#modalBackdrop = this.#createModalBackdrop();
    this.#modalContainer = this.#createModalContainer();
    this.#modal = this.#createModal();
    this.#bindEvents();
  }

  #createModalBackdrop(): HTMLDivElement {
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');
    return backdrop;
  }

  #createModalContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('modal-container');
    return container;
  }

  #createModal(): HTMLDivElement {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.appendChild(this.#modalBackdrop);
    modal.appendChild(this.#modalContainer);

    return modal;
  }

  #bindEvents(): void {
    this.#modalBackdrop.addEventListener('click', () => {
      this.#onClose();
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.#checkModalOpen()) {
        this.#onClose();
      }
    });
  }

  addElementToModalContainer(element: HTMLElement): void {
    this.#modalContainer.appendChild(element);
  }

  open(): void {
    this.#modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.#modal.classList.remove('modal--open');
    document.body.style.overflow = '';
  }

  #checkModalOpen(): boolean {
    return this.#modal.classList.contains('modal--open');
  }

  getElement(): HTMLDivElement {
    return this.#modal;
  }
}

export default Modal;
