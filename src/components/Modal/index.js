import { $ } from '../../utils';
import './index.css';

class Modal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.modalHandler();
  }

  render() {
    this.innerHTML = `
    <div id="modalContainer" class="modal">
      <div id="modalBackdrop" class="modal-backdrop"></div>
    </div>
    `;
  }

  modalHandler() {
    $('#modalBackdrop').addEventListener('click', this.closeModal);
  }

  closeModal() {
    $('#modalContainer').classList.remove('modal--open');
    $('add-restaurant').remove();
  }
}

export default Modal;
