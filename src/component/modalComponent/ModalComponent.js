import BaseComponent from '../baseComponent/BaseComponent.js';
import { EVENT } from '../../types/types.js';
import { $ } from '../../util/dom.js';

class ModalComponent extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    const instance = this.getTemplate('#modal-template');
    this.render(instance);
    this.setEvent();
  }

  setEvent() {
    this.on(
      { target: document, eventName: EVENT.clickedGNBButton },
      this.#handleOpeningModal.bind(this)
    );
  }

  removeEvent() {
    this.off(
      { target: document, eventName: EVENT.clickedGNBButton },
      this.#handleOpeningModal.bind(this)
    );
  }

  #handleOpeningModal() {
    try {
      const $modal = $('.modal');
      $modal.classList.add('modal--open');
    } catch (error) {
      throw new Error();
    }
  }
}

customElements.define('registry-modal', ModalComponent);
