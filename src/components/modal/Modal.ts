import CustomElement from '../CustomElement';
import Button from '../shared/Button';
import RButton from '../shared/Button';

class Modal extends CustomElement {
  static get observedAttributes() {
    return ['open'];
  }

  open() {
    this.querySelector('.modal')?.setAttribute('open', '');
  }

  close() {
    this.querySelector('.modal')?.removeAttribute('open');
  }

  renderTemplate(): string {
    return `
      <style>
      .modal {
        display: none;
      }

      .modal[open] {
        display: block;
      }

      .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background: rgba(0, 0, 0, 0.35);
      }

      .modal-container {
        position: fixed;
        bottom: 0;
        width: 100%;

        padding: 32px 16px;

        border-radius: 8px 8px 0px 0px;
        background: var(--grey-100);
      }

      .modal-title {
        margin-bottom: 36px;
      }
      </style>

      <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          ${this.innerHTML}
        </div>
      </div>
    `;
  }

  render(): void {
    super.render();

    this.addEventListener('submitForm', () => {
      this.dispatchEvent(new CustomEvent('createRestaurant', { bubbles: true }));
    });

    this.addEventListener('cancel', this.close);

    this.querySelector<HTMLDivElement>('.modal-backdrop')?.addEventListener('click', this.close);
  }
}

customElements.define('r-modal', Modal);

export default Modal;
