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
      <add-restaurant></add-restaurant>
    </div>
    `;
  }

  modalHandler() {
    $('#modalBackdrop').addEventListener('click', this.toggleModal);
  }

  toggleModal() {
    $('#modalContainer').classList.toggle('modal--open');
  }
}

export default Modal;
