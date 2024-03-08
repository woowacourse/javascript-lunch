import BaseComponent from '../BaseComponent';
import koreanIcon from '@/assets/category-korean.png';
import asianIcon from '@/assets/category-asian.png';
import japaneseIcon from '@/assets/category-japanese.png';
import chineseIcon from '@/assets/category-chinese.png';
import westernIcon from '@/assets/category-western.png';
import etcIcon from '@/assets/category-etc.png';
import { Category, IRestaurant } from '@/types/Restaurant';

export const Icons: { [key: Category]: string } = {
  한식: koreanIcon,
  아시안: asianIcon,
  일식: japaneseIcon,
  중식: chineseIcon,
  양식: westernIcon,
  기타: etcIcon,
};

class RestaurantItem extends BaseComponent {
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

  render() {
    this.outerHTML = `<li class="restaurant">
    <div class="restaurant__category">
    <img src=${Icons[this.#category]} alt=${this.#category} class="category-icon" />
    </div>
    <div class="restaurant__info">
    <h3 class="restaurant__name text-subtitle">${this.#name}</h3>
    <span class="restaurant__distance text-body">캠퍼스부터 ${this.#distance}분 내</span>
    <p class="restaurant__description text-body">
    ${this.#description ?? ''}
    </p>
    </div>
    </li>`;
  }
}

export default RestaurantItem;

customElements.define('restaurant-item', RestaurantItem);
