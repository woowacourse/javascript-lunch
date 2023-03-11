import { $ } from '../utils';

class Modal extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.closeModalEvent();
  }

  closeModal() {
    this.modalToggle(false);
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

  modalToggle(isOpen) {
    if (isOpen) {
      this.shadowRoot.querySelector('#modal').classList.add('modal-open');
      return;
    }
    this.shadowRoot.querySelector('#modal').classList.remove('modal-open');
  }

  openModal() {
    this.modalToggle(true);
    $('body').classList.add('scroll-hidden');
  }

  render() {
    const kind = this.getAttribute('kind');

    this.shadowRoot.innerHTML = `
    <div id="modal" class="modal" alt="modal">
        <div id="modalBackdrop" class="backdrop"></div>
        ${kind === 'add' && '<add-restaurant-form></add-restaurant-form>'}
        ${kind === 'detail' && '<restaurant-detail >안녕</restaurant-detail>'}
    </div>
`;
  }

  setComponentStyle(zIndex) {
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
        z-index:${zIndex};
      }
`;

    this.shadowRoot.append(componentStyle);
  }
}

export default Modal;
