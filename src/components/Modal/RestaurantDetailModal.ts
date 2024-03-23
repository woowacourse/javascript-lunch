import Restaurant, { IRestaurantInfo } from '../../domain/Restaurant';
import restaurantStore from '../../store/RestaurantStore';
import customCreateElement from '../../utils/customCreateElement';
import Button from '../Button/Button';
import './Modal.css';

class RestaurantDetailModal extends HTMLDivElement {
  #restaurant: IRestaurantInfo;

  #onClick?: () => void;

  constructor(restaurant: IRestaurantInfo, onClick?: () => void) {
    super();
    this.#restaurant = restaurant;
    this.#onClick = onClick;
    this.id = 'restaurant-detail-modal';
    this.classList.add('modal', 'modal--close');

    this.#generateModalBackDrop();
    this.#generateModalContainer(restaurant);
    this.#addToggleEvent();
  }

  toggle() {
    this.classList.toggle('modal--close');
    this.classList.toggle('modal--open');
  }

  #addToggleEvent() {
    const modalBackdrop = this.querySelector('.modal-backdrop');

    modalBackdrop?.addEventListener('click', () => {
      this.toggle();
    });
  }

  #generateModalBackDrop() {
    const modalBackdrop = document.createElement('div');

    modalBackdrop.classList.add('modal-backdrop');
    this.appendChild(modalBackdrop);
  }

  #generateModalContainer(restaurant: IRestaurantInfo) {
    const modalContainer = customCreateElement({ elementType: 'div', classList: ['modal-container'] });
    const content = customCreateElement({
      elementType: 'div',
      content: this.#generateRestaurantDetailTemplate(restaurant),
    });

    modalContainer.appendChild(content);
    modalContainer.appendChild(this.#generateButtonContainer());
    this.appendChild(modalContainer);
  }

  #generateButtonContainer() {
    const buttonContainer = customCreateElement({ elementType: 'div', classList: ['button-container'] });

    buttonContainer.appendChild(this.#generateDeleteButton());
    buttonContainer.appendChild(this.#generateCloseButton());

    return buttonContainer;
  }

  #generateDeleteButton() {
    const deleteButton = new Button({
      content: '삭제',
      addClassList: ['button--secondary'],
      onClick: () => {
        this.#clickDeleteButton();
      },
    });

    return deleteButton.element;
  }

  #clickDeleteButton() {
    restaurantStore.removeRestaurantFromStore(this.#restaurant);
    this.toggle();
    if (this.#onClick) {
      this.#onClick();
    }
  }

  #generateCloseButton() {
    const closeButton = new Button({
      content: '닫기',

      addClassList: ['button--primary'],
      onClick: () => {
        this.toggle();
      },
    });

    return closeButton.element;
  }

  /* eslint-disable max-lines-per-function */
  #generateRestaurantDetailTemplate(restaurant: IRestaurantInfo) {
    return /* html */ `
    <div class="restaurant-container">
      <div class="restaurant__category">
        <img src="./assets/category-${Restaurant.generateImageSrc(restaurant.category)}.png" alt="${
      restaurant.category
    }" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distanceFromCampus}분 내</span>
        <p class="restaurant__description-full text-body">${restaurant.description}</p>
        <a href="https://${restaurant.link}" class="restaurant__link">${restaurant.link}</a>
      </div>
    </div>`;
  }
}

export default RestaurantDetailModal;
