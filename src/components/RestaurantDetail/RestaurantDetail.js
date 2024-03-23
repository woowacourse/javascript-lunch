import './RestaurantDetail.css';

import BookmarkButton, { BOOKMARK_BUTTON_EVENTS } from '../RestaurantItem/BookmarkButton/BookmarkButton';
import CategoryIcon from '../RestaurantItem/CategoryIcon/CategoryIcon';

export const RESTAURANT_DETAIL_EVENTS = {
  isBookmarkChanged: 'isBookmarkChanged',
  deleteItem: 'deleteRestaurantItem',
  closeModal: 'closeRestaurantDetailModal',
};

export default class RestaurantDetail extends HTMLElement {
  #restaurant;

  #categoryIcon;

  #bookmarkBtn;

  #deleteBtn;

  #closeBtn;

  constructor(restaurant) {
    super();

    this.classList.add('restaurant-detail');

    const template = document.querySelector('#template-restaurant-detail');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.#restaurant = restaurant;
    this.#deleteBtn = this.querySelector('#delete');
    this.#closeBtn = this.querySelector('#close');

    this.#categoryIcon = new CategoryIcon(this.#restaurant.category);
    this.querySelector('.restaurant__category').appendChild(this.#categoryIcon);

    this.#bookmarkBtn = new BookmarkButton(this.#restaurant.isBookmark);
    this.querySelector('.restaurant__info').appendChild(this.#bookmarkBtn);
  }

  connectedCallback() {
    this.#bookmarkBtn.addEventListener(BOOKMARK_BUTTON_EVENTS.click, this.#onToggleBookmark.bind(this));
    this.#deleteBtn.addEventListener('click', this.#onClickDeleteButton.bind(this));
    this.#closeBtn.addEventListener('click', this.#onClickCloseButton.bind(this));
    this.#render();
  }

  #onToggleBookmark(e) {
    const { isBookmark } = e.detail;
    this.#restaurant.isBookmark = isBookmark;

    this.dispatchEvent(
      new CustomEvent(RESTAURANT_DETAIL_EVENTS.isBookmarkChanged, {
        bubbles: true,
        detail: { restaurant: { ...this.#restaurant } },
      }),
    );
  }

  #onClickDeleteButton() {
    this.dispatchEvent(
      new CustomEvent(RESTAURANT_DETAIL_EVENTS.deleteItem, {
        bubbles: true,
        detail: {
          id: this.#restaurant.id,
        },
      }),
    );
  }

  #onClickCloseButton() {
    this.dispatchEvent(
      new CustomEvent(RESTAURANT_DETAIL_EVENTS.closeModal, {
        bubbles: true,
      }),
    );
  }

  #render() {
    this.#setName();
    this.#setDistance();
    this.#setDescription();
    this.#setLink();
  }

  #setName() {
    this.querySelector('.restaurant__name').textContent = this.#restaurant.name;
  }

  #setDistance() {
    this.querySelector('.restaurant__distance').textContent = `캠퍼스로부터 ${this.#restaurant.distance}분 내 `;
  }

  #setDescription() {
    const { description } = this.#restaurant;
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.classList.add('restaurant__description');
      descriptionElement.classList.add('text-body');
      descriptionElement.textContent = this.#restaurant.description;
      this.querySelector('.restaurant__info').appendChild(descriptionElement);
    }
  }

  #setLink() {
    const { link } = this.#restaurant;
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.classList.add('restaurant__link');
      linkElement.textContent = link;
      linkElement.href = link;
      this.querySelector('.restaurant__info').appendChild(linkElement);
    }
  }
}
