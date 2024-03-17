import generateModal from './template/generateModal';
import generateRestaurantItem from './template/generateRestaurantItem';
import { $ } from '../utils/dom';
import { closeModal } from '../utils/modalHandler';
import { convertIdToName, convertNameToId } from '../utils/nameConverter';

class RestaurantDetailModal {
  #element;
  #restaurantInstance;
  #restaurant;

  constructor({ targetId, restaurantInstance, restaurant }) {
    this.#element = $(targetId);
    this.#restaurantInstance = restaurantInstance;
    this.#restaurant = restaurant;

    this.initEventListeners();
  }

  initEventListeners() {
    this.#element.addEventListener('click', (event) => {
      this.handleModalClose(event);
      this.handleRestaurantDelete(event);
    });
  }

  render() {
    const buttonContainer = this.generateButtonContainer();
    const content =
      generateRestaurantItem({
        targetId: this.#element.id,
        restaurantsInstance: this.#restaurantInstance,
        restaurant: this.#restaurant,
      }) + buttonContainer;

    generateModal(this.#element, content);

    return this.#element;
  }

  generateButtonContainer() {
    const cancelButtonId = `cancel-button-${convertNameToId(this.#restaurant.name)}`;
    const deleteButtonId = `delete-button-${convertNameToId(this.#restaurant.name)}`;

    return `
      <div class="button-container">
        <button type="button" id="${cancelButtonId}" class="button button--secondary text-caption">취소하기</button>
        <button id="${deleteButtonId}" class="button button--primary text-caption">삭제하기</button>
      </div>
    `;
  }

  handleModalClose(event) {
    const cancelButtonSelector = `#cancel-button-${convertNameToId(this.#restaurant.name)}`;
    const isCloseAction =
      event.target.closest(cancelButtonSelector) ||
      event.target.closest('#restaurant-detail-modal-backdrop');

    if (isCloseAction) {
      closeModal('restaurant-detail-modal');
    }
  }

  handleRestaurantDelete(event) {
    const deleteButtonSelector = `#delete-button-${convertNameToId(this.#restaurant.name)}`;
    const isDeleteAction = event.target.closest(deleteButtonSelector);

    if (isDeleteAction) {
      this.#restaurantInstance.deleteRestaurant(convertIdToName(this.#restaurant.name));
      closeModal('restaurant-detail-modal');
      $('restaurant-detail-modal').innerHTML = '';
      $(`${convertNameToId(this.#restaurant.name)}`).remove();
    }
  }
}

export default RestaurantDetailModal;
