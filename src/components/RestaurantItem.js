import RestaurantDetailModal from './RestaurantDetailModal';
import generateRestaurantItem from './template/generateRestaurantItem';

import { openModal } from '../utils/modalHandler';

class RestaurantItem {
  #element;
  #restaurantsInstance;
  #restaurant;
  #restaurantDetailModal;

  constructor({ element, restaurantsInstance, restaurant }) {
    this.#element = element;
    this.#restaurantsInstance = restaurantsInstance;
    this.#restaurant = restaurant;
    this.#restaurantDetailModal = new RestaurantDetailModal({
      targetId: 'restaurant-detail-modal',
      restaurantInstance: this.#restaurantsInstance,
      restaurant: this.#restaurant,
    });

    this.#initEventListeners();
  }

  getTemplate() {
    return generateRestaurantItem({
      restaurantsInstance: this.#restaurantsInstance,
      restaurant: this.#restaurant,
    });
  }

  #initEventListeners() {
    this.#element.addEventListener('click', this.#handleRestaurantItemClick.bind(this));
  }

  #handleRestaurantItemClick(event) {
    const name = this.#restaurant.name.replace(/\s+/g, '-');

    if (event.target.closest(`#info-${name}`)) {
      this.#restaurantDetailModal.render();
      openModal('restaurant-detail-modal');
    }
  }
}

export default RestaurantItem;
