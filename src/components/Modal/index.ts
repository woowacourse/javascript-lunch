import { Restaurant } from '../../types';
import RestaurantDetail from './ResraurantDetail';
import RestaurantAddForm from './RestaurantAddForm';

import { $ } from '../../utils/dom';

export default class Modal {
  #targetElement: Element;

  constructor(targetElement: Element) {
    this.#targetElement = targetElement;
  }

  render(restaurant?: Restaurant) {
    if (restaurant) {
      this.#targetElement.innerHTML = this.getTemplate(restaurant);

      return this;
    }

    this.#targetElement.innerHTML = this.getTemplate();

    return this;
  }

  getTemplate(restaurant?: Restaurant) {
    return `
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      ${this.getModalContent(restaurant)}
    </div>
    `;
  }

  getModalContent(restaurant?: Restaurant) {
    if (restaurant) {
      return RestaurantDetail.getTemplate(restaurant);
    }

    return RestaurantAddForm.getTemplate();
  }

  bindEvents() {
    this.bindFormModalCloseButtonClickEvent();
  }

  bindFormModalCloseButtonClickEvent() {
    const addFormModalCloseButton = $('#form-modal-close-button');

    if (addFormModalCloseButton instanceof HTMLButtonElement) {
      addFormModalCloseButton.addEventListener('click', this.toggleModal);
    }
  }

  toggleModal() {
    const modal = $('#modal');

    if (modal instanceof Element) {
      modal.classList.toggle('hide');

      return;
    }
  }
}
