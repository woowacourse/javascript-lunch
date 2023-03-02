import RComponent from './RComponent';

class RModal extends RComponent {
  static get observedAttributes() {
    return ['open'];
  }

  open() {
    this.setAttribute('open', '');
  }

  close() {
    this.removeAttribute('open');
  }

  renderTemplate(): string {
    return `
      <style>
      .modal {
        display: none;
      }

      :host([open]) .modal {
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
          <form>
              <slot></slot>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define('r-modal', RModal);

export default RModal;
