import { $ } from '../../../utils/dom';

export default class ModalWrapper {
  getTemplate(element) {
    return `
      <div id="modal-backdrop" class="modal-backdrop"></div>
      <div id="modal-container" class="modal-container">
        ${element}
      </div>
    `;
  }

  _handleClose() {
    $('modal').classList.remove('modal--open');
    $('modal').innerHTML = '';
  }
}
