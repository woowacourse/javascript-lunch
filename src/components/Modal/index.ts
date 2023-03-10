import { IRestaurant } from '../../types';
import RestaurantDetail from './ResraurantDetail';
import RestaurantAddForm from './RestaurantAddForm';

import { $ } from '../../utils/dom';

const Modal = {
  render(targetElement: Element, restaurant?: IRestaurant) {
    if (restaurant) {
      targetElement.innerHTML = this.getTemplate(restaurant);

      return this;
    }

    targetElement.innerHTML = this.getTemplate();

    return this;
  },

  getTemplate(restaurant?: IRestaurant) {
    return `
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      ${this.getModalContent(restaurant)}
    </div>
    `;
  },

  getModalContent(restaurant?: IRestaurant) {
    if (restaurant) {
      return RestaurantDetail.getTemplate(restaurant);
    }

    return RestaurantAddForm.getTemplate();
  },

  bindEvents() {
    this.bindFormModalCloseButtonEvent();
  },

  bindFormModalCloseButtonEvent() {
    const addFormModalCloseButton = $('#form-modal-close-button');

    if (addFormModalCloseButton instanceof HTMLButtonElement) {
      addFormModalCloseButton.addEventListener('click', this.toggleModal);
    }
  },

  toggleModal() {
    const modal = $('#modal');

    if (modal instanceof Element) {
      modal.classList.toggle('hide');

      return;
    }
  },
};

export default Modal;
