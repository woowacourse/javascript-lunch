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

  constructor(
    restaurant = {
      name: '피양콩',
      description:
        '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.',
      distance: 5,
      link: 'https://naver.me/G6DyD9tg',
      isBookmark: true,
    },
  ) {
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
    this.querySelector('.restaurant__description').textContent = this.#restaurant.description;
  }

  #setLink() {
    const { link } = this.#restaurant;
    if (link) {
      const linkElement = this.querySelector('.restaurant__link');
      linkElement.textContent = link;
      linkElement.href = link;
    }
  }
}
