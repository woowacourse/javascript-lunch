import Restaurant, { IRestaurantInfo } from '../domain/Restaurant';
import restaurantStore from '../store/RestaurantStore';
import Button from './Button';

class RestaurantDetailModal extends HTMLDivElement {
  #restaurant: IRestaurantInfo;

  constructor(restaurant: IRestaurantInfo) {
    super();
    this.#restaurant = restaurant;
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
    const modalContainer = document.createElement('div');
    const content = document.createElement('div');
    const buttonContainer = document.createElement('div');

    modalContainer.classList.add('modal-container');
    content.innerHTML = this.#generateRestaurantDetailTemplate(restaurant);
    modalContainer.appendChild(content);

    buttonContainer.classList.add('button-container');

    const deleteButton = new Button({
      content: '삭제',
      onClick: () => {
        restaurantStore.removeRestaurantFromStore(this.#restaurant);
        this.toggle();
        window.location.reload(); // TODO: 새로고침 말고 다시 렌더링 하도록
      },
    });
    const closeButton = new Button({
      content: '닫기',
      onClick: () => {
        this.toggle();
      },
    });
    buttonContainer.appendChild(deleteButton.element);
    buttonContainer.appendChild(closeButton.element);
    modalContainer.appendChild(buttonContainer);

    this.appendChild(modalContainer);
  }

  #generateRestaurantDetailTemplate(restaurant: IRestaurantInfo) {
    return /* html */ `
    <div class="restaurant">
      <div class="restaurant__category">
        <img src="./assets/category-${Restaurant.generateImageSrc(restaurant.category)}.png" alt="${
      restaurant.category
    }" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distanceFromCampus}분 내</span>
        <p class="restaurant__description text-body">${restaurant.description}</p>
        <a src="${restaurant.link}" >
      </div>
    </div>`;
  }
}

export default RestaurantDetailModal;
