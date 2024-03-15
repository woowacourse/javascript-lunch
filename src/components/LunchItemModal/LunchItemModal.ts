import './style.css';
import { Restaurant } from '../../types';
import LunchModal from '../LunchModal/LunchModal';
import LunchRestaurantTypeIcon from '../LunchRestaurantTypeIcon/LunchRestaurantTypeIcon';
import LunchFavoriteIcon from '../LunchFavoriteIcon/LunchFavoriteIcon';
import { CATEGORY_IMG } from '../LunchItem/LunchItem';
import LunchButton from '../LunchButton/LunchButton';

const LUNCH_ITEM_MODAL_CONTENT_HTML = (restaurant: Restaurant) => `
<div class="restaurant__modal-container">
  <div class="restaurant__category-favorite"></div>
  <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
  <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
  <p class="restaurant__description text-body">${restaurant.description}</p>
  <p class="link text-body">${restaurant.link}</p>
</div>
<div class="button-container"></div>`;

class LunchItemModal extends HTMLElement {
  constructor() {
    super();
    this.appendChild(new LunchModal());
    this.setEventListener();
  }

  setEventListener() {
    document.addEventListener('clickItem', (event) => {
      if (!(event instanceof CustomEvent)) return;
      this.querySelector('.modal')?.classList.add('modal--open');
      this.createContent(event.detail.info);
    });
  }

  createContent(restaurant: Restaurant) {
    const container = this.querySelector('.modal-container');
    if (container) {
      container.innerHTML = LUNCH_ITEM_MODAL_CONTENT_HTML(restaurant);
    }

    this.createTitle(restaurant);
    this.createButtons();
  }

  createTitle(restaurant: Restaurant) {
    const title = this.querySelector('.restaurant__category-favorite');
    title?.appendChild(
      new LunchRestaurantTypeIcon({
        imgSrc: CATEGORY_IMG[restaurant.category],
        alt: restaurant.category,
      }),
    );
    title?.appendChild(new LunchFavoriteIcon(restaurant));
  }

  createButtons() {
    const buttonContainer = this.querySelector('.button-container');
    buttonContainer?.appendChild(
      new LunchButton({ color: 'secondary', type: 'button', text: '삭제하기' }),
    );
    buttonContainer?.appendChild(
      new LunchButton({
        color: 'primary',
        type: 'button',
        text: '닫기',
        onClick: this.handleModalOpen.bind(this),
      }),
    );
  }

  handleModalOpen() {
    const modal = this.querySelector('.modal') as LunchModal;
    modal?.handleModalOpen();
  }
}

customElements.define('lunch-item-modal', LunchItemModal);

export default LunchItemModal;
