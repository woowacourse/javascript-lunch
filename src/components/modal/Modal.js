import { $ } from '../../utils/common';

class Modal {
  constructor($target) {
    this.$target = $target;
  }

  setContainer() {
    return `
    <div class="modal modal--open">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
      </div>
    </div>
    `;
  }

  toggleModalOpen() {
    const modal = $('.modal');

    modal.classList.toggle('modal--open');
  }
}

export default Modal;
