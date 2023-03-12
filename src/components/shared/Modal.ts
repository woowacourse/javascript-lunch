import errorHandler from '../../utils/errorHandler';
import CustomElement from '../CustomElement';

class Modal extends CustomElement {
  renderTemplate(): string {
    return `
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
    if (!this.parentElement) return errorHandler.doesNotExistElement();

    this.parentElement.remove();
  };

  initEventHandlers = () => {
    const $modalBackdrop = this.querySelector<HTMLDivElement>('.modal-backdrop');
    const $closeModalButton = this.querySelector<HTMLButtonElement>('button[action="closeModal"]');

    if (!$modalBackdrop) return errorHandler.doesNotExistElement();
    if (!$closeModalButton) return errorHandler.doesNotExistElement();

    $modalBackdrop.addEventListener('click', this.close);
    $closeModalButton.addEventListener('click', this.close);
  };
}

customElements.define('r-modal', Modal);

export default Modal;
