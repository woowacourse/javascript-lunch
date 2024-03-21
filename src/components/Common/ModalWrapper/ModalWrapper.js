import { $ } from '../../../utils/dom';

export default class ModalWrapper {
  constructor(parentElement) {
    this.render(parentElement);
    this._handleModalBackdropClick();
  }

  render(parentElement) {
    parentElement.innerHTML = `
      <div id="modal-backdrop" class="modal-backdrop"></div>
      <div id="modal-container" class="modal-container">
      </div>
    `;
  }

  _handleModalBackdropClick() {
    $('modal-backdrop').addEventListener('click', () => this._handleClose());
  }

  _handleClose() {
    $('modal').classList.remove('modal--open');
    $('modal').innerHTML = '';
  }
}
