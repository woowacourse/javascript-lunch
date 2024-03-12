import './style.css';

import { STORAGE_KEY } from '../../constants';
import { INITIAL_RESTAURANT_DATA } from '../../data/restaurantData';
import { RestaurantInfo } from '../../types';
import { getFavoriteAttributeValue } from '../../utils';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('name');

    const localStorageItem = localStorage.getItem(STORAGE_KEY.restaurants);
    const storeData: RestaurantInfo[] = localStorageItem
      ? (JSON.parse(localStorageItem) as RestaurantInfo[])
      : INITIAL_RESTAURANT_DATA;
    const store = storeData.find((data) => data.name === storeName);

    if (store) {
      const noneDescription = /* html */ `<span class="none-description">상점 설명이 존재하지 않습니다.</span>`;

      this.innerHTML = /* html */ `
      <li class="restaurant">
        <category-icon category="${store.category}"></category-icon>
        <div class="restaurant__info">
          <h3 class="restaurant__info__title">
            ${store.name}
          </h3>
          <p class="restaurant__info__distance"> 캠퍼스부터 ${store.distance}분 내</p>
          <p class="restaurant__info__explanation">
            ${store.description ? store.description : noneDescription}
          </p>
          </div>
          <favorite-icon store-name= "${store.name}" favorite= "${getFavoriteAttributeValue(store.favorite)}"></favorite-icon>
        </li>
        `;

      return;
    }

    this.innerHTML = /* html */ `<p>해당 상점을 찾을 수 없습니다.</p>`;
  }
}

customElements.define('restaurant-item', RestaurantItem);
