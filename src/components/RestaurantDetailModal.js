import createElement from '../utils/createElement.js';
import Modal from './Modal.js';
import createRestaurantItem from './RestaurantItem.js';
import createButton from './Button.js';
import program from '../main.js';

class RestaurantDetailModal {
  #detailModal;

  constructor() {
    this.#detailModal = new Modal();
  }

  updateModalContent({ data }) {
    const $restaurantItem = createRestaurantItem(data);
    $restaurantItem.classList.add('restaurant__column');

    const $buttonContainer = createElement('div', 'button-container');
    const $deleteButton = createButton({
      className: 'button--secondary',
      textContent: '삭제하기',
      buttonType: 'button',
      onClick: () => {
        program.deleteRestaurant(data.id);
        this.#detailModal.toggle();
      },
    });

    const $closeButton = createButton({
      className: 'button--primary',
      textContent: '닫기',
      onClick: () => this.#detailModal.toggle(),
    });

    $buttonContainer.append($deleteButton, $closeButton);

    const fragment = new DocumentFragment();
    fragment.append($restaurantItem, $buttonContainer);
    this.#detailModal.appendModalContent(fragment);
  }

  get modal() {
    return this.#detailModal;
  }
}

export default RestaurantDetailModal;
