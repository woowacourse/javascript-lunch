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
    this.on({ target: $('#modal-form'), eventName: 'submit' }, this.#handleSubmit.bind(this));
    this.on({ target: $('#modal-form'), eventName: 'reset' }, this.#handleReset.bind(this));
    this.on(
      { target: document, eventName: EVENT.clickedModalSubmitButton },
      this.#handleReset.bind(this)
    );
    this.on({ target: $('.modal-backdrop'), eventName: 'click' }, this.#handleReset.bind(this));
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

  #handleSubmit(event) {
    event.preventDefault();

    const form = event.target;

    try {
      const restaurant = {};
      restaurant.category = form.category.value;
      restaurant.name = form.name.value;
      restaurant.distance = form.distance.value;
      restaurant.description = form.description.value;
      restaurant.link = form.link.value;

      this.emit(EVENT.clickedModalSubmitButton, restaurant);
    } catch (error) {
      throw new Error();
    }
  }

  #handleReset() {
    try {
      $('.modal').classList.remove('modal--open');
    } catch (error) {
      throw new Error();
    }
  }
}

customElements.define('registry-modal', ModalComponent);
