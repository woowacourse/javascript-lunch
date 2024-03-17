import RestaurantDetailModal from './RestaurantDetailModal';
import generateRestaurantItem from './template/generateRestaurantItem';

import { toggleModal } from '../utils/modalHandler';

class RestaurantItem {
  #element;
  #restaurant;
  #restaurantDetailModal;

  constructor({ element, restaurant }) {
    this.#element = element;
    this.#restaurant = restaurant;
    this.#restaurantDetailModal = new RestaurantDetailModal({
      targetId: 'restaurant-detail-modal',
      restaurant: this.#restaurant,
    });

    this.#initEventListeners();
  }

  getTemplate() {
    return generateRestaurantItem(this.#restaurant);
  }

  #initEventListeners() {
    this.#element.addEventListener('click', this.#handleRestaurantItemClick.bind(this));
  }

  #handleRestaurantItemClick(event) {
    const name = this.#restaurant.name.replace(/\s+/g, '-');

    if (event.target.closest(`#info-${name}`)) {
      this.#restaurantDetailModal.render();
      toggleModal('restaurant-detail-modal');
    }
  }
}

export default RestaurantItem;
