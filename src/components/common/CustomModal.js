import { $ } from '../../utils/dom';

customElements.define(
  'custom-modal',
  class CustomModal extends HTMLElement {
    constructor() {
      super();

      this.innerHTML = /* html */ `
      <dialog class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container"></div>
      </dialog>
      `;
    }

    connectedCallback() {
      $('.modal-backdrop').addEventListener('click', this.closeModal);
      $('.modal-container').addEventListener('animationend', this.removeAnimation);
    }

    openModal() {
      $('body').classList.add('no-scroll');
      $('.modal-container').classList.add('slide-up');
      $('.modal').showModal();

      setTimeout(() => {
        $('.modal-container').classList.remove('slide-up');
      }, 300);
    }

    closeModal() {
      $('body').classList.remove('no-scroll');
      $('.modal-container').classList.add('slide-down');

      setTimeout(() => {
        $('.modal').close();
        $('.modal-container').classList.remove('slide-down');
      }, 300);
    }

    removeAnimation() {
      const { classList } = $('.modal-container');

      if (classList.contains('slide-up')) {
        classList.remove('slide-up');
        return;
      }

      if (classList.contains('slide-down')) {
        $('.modal').close();
        classList.remove('slide-down');
      }
    }
  }
);
