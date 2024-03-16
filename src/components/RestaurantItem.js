import { $ } from '../utils/dom';
import { toggleModal } from '../utils/modalHandler';
import generateRestaurantItem from './template/generateRestaurantItem';

class RestaurantItem {
  #element;
  #restaurant;

  constructor({ element, restaurant }) {
    this.#element = element;
    this.#restaurant = restaurant;

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
    if (event.target.closest(`#${name}`)) {
      toggleModal('restaurant-detail-modal');
    }
  }
}

export default RestaurantItem;
