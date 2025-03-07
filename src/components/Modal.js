import { DOM } from '../dom.js';

const MODAL_TEMPLATE = `<div class="modal-backdrop"></div>
          <div class="modal-container"></div>`;

class Modal {
  #modal;
  constructor() {
    this.#modal = this.createModal();
  }

  createModal = () => {
    const divModal = document.createElement('div');
    divModal.classList.add('modal');
    divModal.innerHTML = MODAL_TEMPLATE;
    DOM.APP.appendChild(divModal);
    return divModal; //추가
  };

  addElement = (element) => {
    const divElement = this.#modal.querySelector('.modal-container');
    divElement.appendChild(element);
  };

  openModal = () => {
    this.#modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  };

  closeModal = () => {
    this.#modal.classList.remove('modal--open');
    document.body.style.overflow = '';
  };
}

export default Modal;
