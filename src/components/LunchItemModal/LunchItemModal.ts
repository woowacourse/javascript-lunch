import './style.css';
import { Restaurant } from '../../types';
import LunchModal from '../LunchModal/LunchModal';
import LunchRestaurantTypeIcon from '../LunchRestaurantTypeIcon/LunchRestaurantTypeIcon';
import LunchFavoriteIcon from '../LunchFavoriteIcon/LunchFavoriteIcon';
import { CATEGORY_IMG } from '../LunchItem/LunchItem';

const LUNCH_ITEM_MODAL_CONTENT_HTML = (restaurant: Restaurant) => `
<div class="restaurant__modal-container">
  <div class="restaurant__category-favorite">
    
  </div>
  <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
  <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
  <p class="restaurant__description text-body">${restaurant.description}</p>
  <p class="link text-body">${restaurant.link}</p>
</div>
<div class="button-container">
  <lunch-button type="button" text="삭제하기" color="secondary"></lunch-button>
  <lunch-button type="button" text="닫기" color="primary"></lunch-button>
</div>
          `;

class LunchItemModal extends HTMLElement {
  constructor(restaurant: Restaurant) {
    super();
    this.createContent(restaurant);
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
    const title = this.querySelector('.restaurant__category-favorite');
    title?.appendChild(
      new LunchRestaurantTypeIcon({
        imgSrc: CATEGORY_IMG[restaurant.category],
        alt: restaurant.category,
      }),
    );
    title?.appendChild(new LunchFavoriteIcon(restaurant));
  }
}

customElements.define('lunch-item-modal', LunchItemModal);

export default LunchItemModal;
