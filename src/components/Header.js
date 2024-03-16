import generateHeader from './template/generateHeader';
import { $ } from '../utils/dom';
import { toggleModal } from '../utils/modalHandler';

class Header {
  #element;

  constructor({ targetId }) {
    this.#element = $(targetId);

    this.#initEventListeners();
  }

  render() {
    this.#element.innerHTML = generateHeader();
  }

  #initEventListeners() {
    this.#element.addEventListener('click', this.#openRestaurantCreationModal.bind(this));
  }

  #openRestaurantCreationModal(event) {
    if (event.target.closest('#gnb__button')) {
      toggleModal('restaurant-creation-modal');
    }
  }
}

export default Header;
