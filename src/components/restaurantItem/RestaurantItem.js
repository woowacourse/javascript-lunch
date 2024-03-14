import './RestaurantItem.css';

// icon images
import koreanIcon from '../../statics/imgs/category-korean.png';
import chineseIcon from '../../statics/imgs/category-chinese.png';
import japaneseIcon from '../../statics/imgs/category-japanese.png';
import westernIcon from '../../statics/imgs/category-western.png';
import asianIcon from '../../statics/imgs/category-asian.png';
import etcIcon from '../../statics/imgs/category-etc.png';

// bookmark button images
import bookmarkIconFilled from '../../statics/imgs/favorite-icon-filled.png';
import bookmarkIconLined from '../../statics/imgs/favorite-icon-lined.png';

export const RESTAURANT_ITEM_EVENTS = {
  bookmarkBtnClicked: 'bookmarkBtnClicked',
};
// TODO: category icon 컴포넌트로 분리하기
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
    this.#setName();
    this.#setDistance();
    this.#setDescription();
    this.#setCategoryIcon();
    this.#setBookmarkButton();
  }

  connectedCallback() {
    this.#bookmarkBtn.addEventListener('click', this.#handleToggleBookmarkBtn.bind(this));
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
    this.querySelector('.category-icon').src = this.#getCategoryIconUrl(this.#restaurant.category);
    this.querySelector('.category-icon').alt = this.#restaurant.category;
  }

  #setBookmarkButton() {
    const img = this.#bookmarkBtn.querySelector('img');
    img.src = this.#restaurant.isBookmark ? bookmarkIconFilled : bookmarkIconLined;
  }

  #getCategoryIconUrl(category) {
    if (category === '한식') return koreanIcon;
    if (category === '중식') return chineseIcon;
    if (category === '일식') return japaneseIcon;
    if (category === '양식') return westernIcon;
    if (category === '아시안') return asianIcon;
    if (category === '기타') return etcIcon;
    return '';
  }
}
