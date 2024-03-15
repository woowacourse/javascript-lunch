import './RestaurantItem.css';

// bookmark button images
import bookmarkIconFilled from '../../statics/imgs/favorite-icon-filled.png';
import bookmarkIconLined from '../../statics/imgs/favorite-icon-lined.png';
import CategoryIcon from './CategoryIcon/CategoryIcon';

export const RESTAURANT_ITEM_EVENTS = {
  bookmarkBtnClicked: 'bookmarkBtnClicked',
};
// TODO: button-container 컴포넌트로 분리하기
export default class RestaurantItem extends HTMLLIElement {
  #restaurant;

  #bookmarkBtn;

  constructor() {
    super();

    const template = document.querySelector('#template-restaurant-item');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    this.classList.add('restaurant');

    this.#bookmarkBtn = this.querySelector('.restaurant__bookmark');
  }

  set restaurant(restaurant) {
    this.#restaurant = restaurant;
    this.#render();
  }

  connectedCallback() {
    this.#bookmarkBtn.addEventListener('click', this.#handleToggleBookmarkBtn.bind(this));
    this.addEventListener('click', this.#handleBodyClick.bind(this));
  }

  #handleToggleBookmarkBtn() {
    this.#restaurant.isBookmark = !this.#restaurant.isBookmark;
    this.#setBookmarkButton();

    this.dispatchEvent(
      new CustomEvent(RESTAURANT_ITEM_EVENTS.bookmarkBtnClicked, {
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
    this.#setCategoryIcon();
    this.#setBookmarkButton();
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

  #setCategoryIcon() {
    const categoryIcon = new CategoryIcon(this.#restaurant.category);
    this.querySelector('.restaurant__category').appendChild(categoryIcon);
  }

  #setBookmarkButton() {
    const img = this.#bookmarkBtn.querySelector('img');
    img.src = this.#restaurant.isBookmark ? bookmarkIconFilled : bookmarkIconLined;
  }
}
