import './style.css';
import { findStoreFromLocalStorage } from '../../utils';

class RestaurantDescription extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('store-name');
    const store = findStoreFromLocalStorage(storeName);

    const noneDescription = /* html */ `<span class="none-description">상점 설명이 존재하지 않습니다.</span>`;

    if (store) {
      const $p = document.createElement('p');

      $p.className = 'restaurant__info__explanation';
      $p.innerHTML = `${store.description ? store.description : noneDescription}`;

      this.appendChild($p);
    }
  }
}

customElements.define('restaurant-description', RestaurantDescription);
