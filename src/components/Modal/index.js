import { $ } from '../../utils';
import './index.css';

class Modal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.handleModal();
  }

  render() {
    this.innerHTML = `
    <div id="modalContainer" class="modal">
      <div id="modalBackdrop" class="modal-backdrop"></div>
    </div>
    `;
  }

  handleModal() {
    $('#modalBackdrop').addEventListener('click', this.closeModal);

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
    });
  }

  closeModal() {
    const modalContainer = $('#modalContainer');
    modalContainer.classList.remove('modal--open');

    ['restaurant-details', 'add-restaurant'].forEach((elementName) => {
      const element = modalContainer.querySelector(elementName);
      if (element) {
        modalContainer.removeChild(element);
      }
    });
  }
}

export default Modal;
