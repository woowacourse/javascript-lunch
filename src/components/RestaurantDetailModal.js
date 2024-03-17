import { $ } from '../utils/dom';
import generateModal from './template/generateModal';
import generateRestaurantItem from './template/generateRestaurantItem';
import { toggleModal } from '../utils/modalHandler';

class RestaurantDetailModal {
  #element;
  #restaurant;

  constructor({ targetId, restaurant }) {
    this.#element = $(targetId);
    this.#restaurant = restaurant;

    this.#initEventListeners();
  }

  render() {
    generateModal(this.#element, generateRestaurantItem(this.#restaurant));
  }

  #initEventListeners() {
    this.#element.addEventListener('click', this.#handleModalClose.bind(this));
  }

  #handleModalClose(event) {
    const targetId = event.target.id;
    if (targetId === 'restaurant-detail-modal-backdrop') {
      toggleModal('restaurant-detail-modal');
      this.#element.innerHTML = '';
    }
  }
}

export default RestaurantDetailModal;
