import './style.css';
import { Restaurant } from '../../types';
import LunchModal from '../LunchModal/LunchModal';
import LunchRestaurantTypeIcon from '../LunchRestaurantTypeIcon/LunchRestaurantTypeIcon';
import LunchFavoriteIcon from '../LunchFavoriteIcon/LunchFavoriteIcon';
import { CATEGORY_IMG } from '../LunchItem/LunchItem';
import LunchButton from '../LunchButton/LunchButton';
import { RestaurantRegistry } from '../../domain';

const LUNCH_ITEM_MODAL_CONTENT_HTML = (restaurant: Restaurant) => `
<div class="restaurant__modal-container">
  <div class="restaurant__category-favorite"></div>
  <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
  <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
  <p class="restaurant__description text-body">${restaurant.description ?? ''}</p>
  <p class="link text-body">${restaurant.link ?? ''}</p>
</div>
<div class="button-container"></div>`;

class LunchItemModal extends HTMLElement {
  #restaurant: Restaurant = { name: '', category: '기타', distance: 5, createdAt: Date.now() };

  constructor() {
    super();
    this.appendChild(new LunchModal());
  }

  setRestaurant(restaurant: Restaurant) {
    this.#restaurant = restaurant;
    this.createContent();
  }

  createContent() {
    const container = this.querySelector('.modal-container');
    if (container) {
      container.innerHTML = LUNCH_ITEM_MODAL_CONTENT_HTML(this.#restaurant);
    }

    this.createTitle();
    this.createButtons();
  }

  createTitle() {
    const title = this.querySelector('.restaurant__category-favorite');
    title?.appendChild(
      new LunchRestaurantTypeIcon({
        imgSrc: CATEGORY_IMG[this.#restaurant.category],
        alt: this.#restaurant.category,
      }),
    );
    title?.appendChild(new LunchFavoriteIcon(this.#restaurant));
  }

  // eslint-disable-next-line max-lines-per-function
  createButtons() {
    const buttonContainer = this.querySelector('.button-container');
    buttonContainer?.appendChild(
      new LunchButton({
        color: 'secondary',
        type: 'button',
        text: '삭제하기',
        onClick: this.handleDeleteItem.bind(this),
      }),
    );
    buttonContainer?.appendChild(
      new LunchButton({
        color: 'primary',
        type: 'button',
        text: '닫기',
        onClick: this.dispatchToggleItemDetailModalEvent.bind(this),
      }),
    );
  }

  handleDeleteItem() {
    RestaurantRegistry.deleteOneRestaurant(this.#restaurant);
    this.dispatchRerenderEvent();
    this.dispatchToggleItemDetailModalEvent();
  }

  dispatchToggleItemDetailModalEvent() {
    const toggleItemDetailModal = new CustomEvent('toggleItemDetailModal', {
      detail: { info: this.#restaurant },
      bubbles: true,
    });
    this.dispatchEvent(toggleItemDetailModal);
  }

  dispatchRerenderEvent() {
    const rerenderEvent = new CustomEvent('rerender', { bubbles: true });
    this.dispatchEvent(rerenderEvent);
  }
}

customElements.define('lunch-item-modal', LunchItemModal);

export default LunchItemModal;
