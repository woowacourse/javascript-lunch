import './style.css';

import { findRestaurant } from '../../utils';

class RestaurantDescription extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('store-name');
    const store = findRestaurant(storeName);

    const noneDescription = /* html */ `<span class="none-description">상점 설명이 존재하지 않습니다.</span>`;

    if (store) {
      const $description = document.createElement('p');

      $description.className = 'restaurant__info__description';
      $description.innerHTML = `${store.description ? store.description : noneDescription}`;

      this.appendChild($description);
    }
  }
}

customElements.define('restaurant-description', RestaurantDescription);
