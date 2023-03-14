import CustomElement from '../CustomElement';

class Modal extends CustomElement {
  renderTemplate(): string {
    return `
      <style>
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

        max-height: 90%;
        overflow: auto;
      }

      .modal-title {
        margin-bottom: 36px;
      }
      </style>
      <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${this.innerHTML}
        </div>
      </div>
    `;
  }

  render = () => {
    super.render();

    this.initEventHandlers();
  };

  close = () => {
    if (!this.parentElement) return;

    this.parentElement.remove();
  };

  initEventHandlers = () => {
    const $modalBackdrop = this.querySelector<HTMLDivElement>('.modal-backdrop');
    const $closeModalButton = this.querySelector<HTMLButtonElement>('button[action="closeModal"]');

    if (!$modalBackdrop) return;

    $modalBackdrop.addEventListener('click', this.close);

    if (!$closeModalButton) return;

    $closeModalButton.addEventListener('click', this.close);
  };
}

customElements.define('r-modal', Modal);

export default Modal;
