import { $ } from '../../utils/dom';

customElements.define(
  'custom-modal',
  class CustomModal extends HTMLElement {
    constructor() {
      super();

      this.render('');
    }

    render(children) {
      this.innerHTML = /* html */ `
        <dialog class="modal">
          <div class="modal-backdrop"></div>
          <div class="modal-container">
            ${children}
          </div>
        </dialog>`;
      $('.modal-backdrop').addEventListener('click', () => this.closeModal());
    }

    openModal(content) {
      this.render(content);
      $('.modal').showModal();
    }

    closeModal() {
      this.render('');
      $('.modal').close();
    }
  }
);
