import './RestaurantItem.css';

import CategoryIcon from './CategoryIcon/CategoryIcon';
import BookmarkButton, { BOOKMARK_BUTTON_EVENTS } from './BookmarkButton/BookmarkButton';

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
    this.addEventListener('click', this.#handleBodyClick.bind(this));

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

  #handleBodyClick() {}

  #render() {
    this.#setName();
    this.#setDistance();
    this.#setDescription();
  }

  #setName() {
    this.querySelector('.restaurant__name').innerHTML = this.#restaurant.name;
  }

  #setDistance() {
    this.querySelector('.restaurant__distance').innerHTML = `캠퍼스로부터 ${this.#restaurant.distance}분 내 `;
  }

  #setDescription() {
    this.querySelector('.restaurant__description').innerHTML = this.#restaurant.description;
  }
}
