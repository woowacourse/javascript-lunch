import { $ } from '../utils/dom';
import generateModal from './template/generateModal';
import generateRestaurantItem from './template/generateRestaurantItem';
import { closeModal } from '../utils/modalHandler';

class RestaurantDetailModal {
  #element;
  #restaurantInstance;
  #restaurant;

  constructor({ targetId, restaurantInstance, restaurant }) {
    this.#element = $(targetId);
    this.#restaurant = restaurant;
    this.#restaurantInstance = restaurantInstance;

    this.#initEventListeners();
  }

  render() {
    generateModal(
      this.#element,
      generateRestaurantItem({
        restaurantInstance: this.#restaurantInstance,
        restaurant: this.#restaurant,
      }),
    );
  }

  #initEventListeners() {
    this.#element.addEventListener('click', this.#handleModalClose.bind(this));
  }

  #handleModalClose(event) {
    const targetId = event.target.id;
    if (targetId === 'restaurant-detail-modal-backdrop') {
      // TODO: 수정 필요
      closeModal('restaurant-detail-modal');
      $('restaurant-detail-modal').innerHTML = '';
    }
  }
}

export default RestaurantDetailModal;
