import { DOM } from '../dom.js';

const MODAL_TEMPLATE = `<div class="modal-backdrop"></div>
          <div class="modal-container"></div>`;

class Modal {
  constructor() {
    return this.createModal();
  }

  createModal = () => {
    const divModal = document.createElement('div');
    divModal.classList.add('modal', 'modal--open');
    divModal.innerHTML = MODAL_TEMPLATE;
    DOM.APP.appendChild(divModal);
  };

  addElement = (element) => {
    const divElement = document.querySelector('.modal-container');
    divElement.appendChild(element);
  };

  closeModal = () => {
    const modal = document.querySelector('.modal');
    console.log(modal, 'here');
    modal.remove();
  };
}

export default Modal;
