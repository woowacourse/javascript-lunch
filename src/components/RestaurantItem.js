import './RestaurantItem.css';

import koreanIcon from '../statics/imgs/category-korean.png';
import chineseIcon from '../statics/imgs/category-chinese.png';
import japaneseIcon from '../statics/imgs/category-japanese.png';
import westernIcon from '../statics/imgs/category-western.png';
import asianIcon from '../statics/imgs/category-asian.png';
import etcIcon from '../statics/imgs/category-etc.png';

export default class RestaurantItem extends HTMLLIElement {
  constructor() {
    super();

    const template = document.querySelector('#template-restaurant-item');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    this.classList.add('restaurant');
  }

  static observedAttributes = ['data-restaurant'];

  get restaurant() {
    if (!this.dataset.restaurant) {
      return {};
    }
    return JSON.parse(this.dataset.restaurant);
  }

  set restaurant(value) {
    this.setAttribute('data-restaurant', JSON.stringify(value));
  }

  attributeChangedCallback() {
    this.#initRestaurantItem();
  }

  #initRestaurantItem() {
    const { category, name, distance, description } = this.restaurant;

    this.querySelector('.restaurant__name').innerHTML = name;
    this.querySelector('.restaurant__distance').innerHTML = `캠퍼스로부터 ${distance}분 내 `;
    this.querySelector('.restaurant__description').innerHTML = description;
    this.querySelector('.category-icon').src = this.#getCategoryIconUrl(category);
    this.querySelector('.category-icon').alt = category;
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
