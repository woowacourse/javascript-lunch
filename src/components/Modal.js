import { $ } from '../utils';

class Modal extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .modal {
          display: none;
          overflow-x:hidden;
        }
      
      .modal-open {
        display: block;
        overflow-x:hidden;
      }
      
      .backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.35);
      }
`;

    this.shadowRoot.innerHTML = `
        <div id="modal" class="modal" alt="modal">
            <div id="modalBackdrop" class="backdrop"></div>
            <add-restaurant-form></add-restaurant-form>
        </div>
    `;

    this.shadowRoot.append(componentStyle);

    this.closeModalEvent();
  }

  closeModal() {
    this.modalOpen(false);
    $('body').classList.remove('scroll-hidden');
  }

  closeModalEvent() {
    this.shadowRoot
      .querySelector('#modalBackdrop')
      .addEventListener('click', () => {
        this.closeModal();
      });

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
    });
  }

  modalOpen(isOpen) {
    if (isOpen) {
      this.shadowRoot.querySelector('#modal').classList.add('modal-open');
      return;
    }
    this.shadowRoot.querySelector('#modal').classList.remove('modal-open');
  }
}

export default Modal;
