import './style.css';
import { Restaurant } from '../../types';
import LunchModal from '../LunchModal/LunchModal';
import LunchRestaurantTypeIcon from '../LunchRestaurantTypeIcon/LunchRestaurantTypeIcon';
import LunchFavoriteIcon from '../LunchFavoriteIcon/LunchFavoriteIcon';
import { CATEGORY_IMG } from '../LunchItem/LunchItem';
import LunchButton from '../LunchButton/LunchButton';
import { RestaurantRegistry } from '../../domain';
import LunchItems from '../LunchItems/LunchItems';
import LunchItemFilter from '../LunchItemFilter/LunchItemFilter';
import LunchTab from '../LunchTab/LunchTab';

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
    this.setEventListener();
  }

  setEventListener() {
    document.addEventListener('clickItem', (event) => {
      if (!(event instanceof CustomEvent)) return;
      const modal = this.querySelector('.modal') as LunchModal;
      modal.handleModalOpen();
      this.#restaurant = event.detail.info;
      this.createContent();
    });
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
        onClick: this.handleModalOpen.bind(this),
      }),
    );
  }

  handleDeleteItem() {
    RestaurantRegistry.deleteOneRestaurant(this.#restaurant);

    const items = document.querySelector('lunch-items') as LunchItems;
    const tab = (document.querySelector('.lunch-tab') as LunchTab).nowSelected;
    const filter = document.querySelector('lunch-item-filter') as LunchItemFilter;
    const dropdowns = filter.querySelectorAll('select');
    if (tab === 'favorite-restaurants') {
      items.renderItems({ database: 'liked' });
    } else {
      items.renderItems({ category: dropdowns[0].value, sortBy: dropdowns[1].value });
    }

    this.handleModalOpen();
  }

  handleModalOpen() {
    const modal = this.querySelector('.modal') as LunchModal;
    modal?.handleModalOpen();
  }
}

customElements.define('lunch-item-modal', LunchItemModal);

export default LunchItemModal;
