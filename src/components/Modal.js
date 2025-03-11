const MODAL_TEMPLATE = `<div class="modal-backdrop"></div>
          <div class="modal-container"></div>`;

class Modal {
  #appContainer;
  #modal;

  constructor(appContainer) {
    this.#appContainer = appContainer;
    this.#modal = this.createModal();
  }

  createModal() {
    const divModal = document.createElement('div');
    divModal.classList.add('modal');
    divModal.innerHTML = MODAL_TEMPLATE;
    this.#appContainer.appendChild(divModal);
    return divModal;
  }

  addElement(element) {
    const divElement = this.#modal.querySelector('.modal-container');
    divElement.appendChild(element);
  }

  openModal() {
    this.#modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.#modal.classList.remove('modal--open');
    document.body.style.overflow = '';
  }
}

export default Modal;
