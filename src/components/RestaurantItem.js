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

  set restaurant(restaurant) {
    const { name, distance, description, category } = restaurant;
    this.#setName(name);
    this.#setDistance(distance);
    this.#setDescription(description);
    this.#setCategoryIcon(category);
  }

  #setName(name) {
    this.querySelector('.restaurant__name').innerHTML = name;
  }

  #setDistance(distance) {
    this.querySelector('.restaurant__distance').innerHTML = `캠퍼스로부터 ${distance}분 내 `;
  }

  #setDescription(description) {
    this.querySelector('.restaurant__description').innerHTML = description;
  }

  #setCategoryIcon(category) {
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
