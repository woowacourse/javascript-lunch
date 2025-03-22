import createButton from './common/Button.js';
import Modal from './common/Modal.js';
import createSectionContainer from './common/SectionContainer.js';
import createRestaurantItem from './RestaurantItem.js';

class RestaurantDetailModal {
  #detailModal;

  constructor() {
    this.#detailModal = new Modal();
  }

  updateModalContent({ data, onClickStar, onDelete }) {
    const $restaurantItem = createRestaurantItem({ data, onClickStar, detail: true });
    $restaurantItem.classList.add('restaurant__column');

    const $buttonContainer = createSectionContainer('button-container');
    const $deleteButton = createButton({
      className: 'button--secondary',
      textContent: '삭제하기',
      buttonType: 'button',
      onClick: (event) => onDelete(event, data.id),
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
