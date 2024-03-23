import Modal from './Modal';
import generateModal from './template/generateModal';
import { $ } from '../utils/dom';

import {
  generateRestaurantItem,
  generateRestaurantItems,
} from './template/generateRestaurantItems';

class RestaurantDetailModal extends Modal {
  #restaurantsInstance;
  #restaurant;

  constructor({ targetId, restaurantsInstance }) {
    super({ targetId });
    this.#restaurantsInstance = restaurantsInstance;

    this.initEventListeners();
  }

  initEventListeners() {
    this.element.addEventListener('click', (event) => {
      this.handleModalClose(event);
      this.handleRestaurantDelete(event);
    });
  }

  render(restaurant) {
    this.#restaurant = restaurant;
    const buttonContainer = this.generateButtonContainer();
    const content = generateRestaurantItem(restaurant) + buttonContainer;

    return generateModal(this.element, content);
  }

  generateButtonContainer() {
    return `
      <div class="button-container">
        <button type="button" id="cancel-detail-modal-button" class="button button--secondary text-caption">취소하기</button>
        <button id="delete-restaurant-item-button" class="button button--primary text-caption">삭제하기</button>
      </div>
    `;
  }

  handleModalClose(event) {
    const isCloseAction =
      event.target.closest('#cancel-detail-modal-button') ||
      event.target.closest('#restaurant-detail-modal-backdrop');

    if (isCloseAction) {
      this.closeModal();
    }
  }

  handleRestaurantDelete(event) {
    const deleteRestaurantItemButton = event.target.closest('#delete-restaurant-item-button');

    if (deleteRestaurantItemButton) {
      this.#restaurantsInstance.deleteRestaurant(this.#restaurant.name);
      this.closeModal();

      $('restaurant-list').innerHTML = generateRestaurantItems(
        this.#restaurantsInstance.standardList,
      );
    }
  }
}

export default RestaurantDetailModal;
