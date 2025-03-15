const MODAL_TEMPLATE = `<div class="modal-backdrop"></div>
          <div class="modal-container"></div>`;

class Modal {
  #appContainer;
  #modal;

  constructor(appContainer) {
    this.#appContainer = appContainer;
    this.createModal();
  }

  createModal() {
    const divModal = document.createElement('div');
    divModal.classList.add('modal');
    divModal.innerHTML = MODAL_TEMPLATE;
    this.#appContainer.appendChild(divModal);
    this.#modal = divModal;
  }

  addElement(element) {
    const divElement = this.#modal.querySelector('.modal-container');
    divElement.appendChild(element);
  }

  getModalContainer() {
    return this.#modal.querySelector('.modal-container');
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
