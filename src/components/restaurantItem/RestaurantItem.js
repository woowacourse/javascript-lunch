import './RestaurantItem.css';

import CategoryIcon from './CategoryIcon/CategoryIcon';
import BookmarkButton, { BOOKMARK_BUTTON_EVENTS } from './BookmarkButton/BookmarkButton';
import RestaurantDetail from '../RestaurantDetail/RestaurantDetail';

export const RESTAURANT_ITEM_EVENTS = {
  isBookmarkChanged: 'isBookmarkChanged',
};

export default class RestaurantItem extends HTMLLIElement {
  #restaurant;

  #categoryIcon;

  #bookmarkBtn;

  constructor(restaurant) {
    super();

    this.classList.add('restaurant');

    const template = document.querySelector('#template-restaurant-item');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.#restaurant = restaurant;

    this.#categoryIcon = new CategoryIcon(this.#restaurant.category);
    this.querySelector('.restaurant__category').appendChild(this.#categoryIcon);

    this.#bookmarkBtn = new BookmarkButton(this.#restaurant.isBookmark);
    this.appendChild(this.#bookmarkBtn);
  }

  connectedCallback() {
    this.#bookmarkBtn.addEventListener(BOOKMARK_BUTTON_EVENTS.click, this.#handleToggleBookmarkBtn.bind(this));
    this.querySelector('.restaurant__info').addEventListener('click', this.#handleBodyClick.bind(this));

    this.#render();
  }

  #handleToggleBookmarkBtn(e) {
    const { isBookmark } = e.detail;
    this.#restaurant.isBookmark = isBookmark;

    this.dispatchEvent(
      new CustomEvent(RESTAURANT_ITEM_EVENTS.isBookmarkChanged, {
        bubbles: true,
        detail: { restaurant: { ...this.#restaurant } },
      }),
    );
  }

  #handleBodyClick() {
    const restaurantDetail = new RestaurantDetail({ ...this.#restaurant });
    restaurantDetail.setAttribute('slot', 'body');

    const modal = document.querySelector('app-modal');
    modal.openModal({ body: restaurantDetail });
  }

  #render() {
    this.#setName();
    this.#setDistance();
    this.#setDescription();
  }

  #setName() {
    this.querySelector('.restaurant__name').textContent = this.#restaurant.name;
  }

  #setDistance() {
    this.querySelector('.restaurant__distance').textContent = `캠퍼스로부터 ${this.#restaurant.distance}분 내 `;
  }

  #setDescription() {
    this.querySelector('.restaurant__description').textContent = this.#restaurant.description;
  }
}
