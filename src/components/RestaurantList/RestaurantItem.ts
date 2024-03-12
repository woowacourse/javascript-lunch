import koreanIcon from '@assets/category-korean.png';
import asianIcon from '@assets/category-asian.png';
import japaneseIcon from '@assets/category-japanese.png';
import chineseIcon from '@assets/category-chinese.png';
import westernIcon from '@assets/category-western.png';
import etcIcon from '@assets/category-etc.png';
import { Category, IRestaurant } from '@/types/Restaurant';

import style from './RestaurantItem.module.css';

export const Icons: { [key in Category]: string } = {
  한식: koreanIcon,
  아시안: asianIcon,
  일식: japaneseIcon,
  중식: chineseIcon,
  양식: westernIcon,
  기타: etcIcon,
};

class RestaurantItem extends HTMLLIElement {
  #category;
  #distance;
  #description;
  #name;

  constructor({ category, name, distance, description }: IRestaurant) {
    super();
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.className = `restaurant ${style.restaurant}`;
    this.innerHTML = `
    <div class="restaurant__category ${style.restaurant__category}" >
    <img src=${Icons[this.#category]} alt=${this.#category} class="category-icon ${
      style.categoryIcon
    }" />
    </div>
    <div class="restaurant__info ${style.restaurant__info}">
    <h3 class="restaurant__name text-subtitle ${style.restaurant__name}">${this.#name}</h3>
    <span class="restaurant__distance text-body  ${style.restaurant__distance}">캠퍼스부터 ${
      this.#distance
    }분 내</span>
    <p class="restaurant__description text-body ${style.restaurant__description}">
    ${this.#description ?? ''}
    </p>
    <img is="favorite-icon" style="width:25px; position:absolute; right:10px; top:10px;" />
    </div>
   `;
  }
}

export default RestaurantItem;

customElements.define('restaurant-item', RestaurantItem, { extends: 'li' });
