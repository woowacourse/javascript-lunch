import { RestaurantInfo } from '../../types';
import './style.css';
import { INITIAL_RESTAURANT_DATA } from '../../data/restaurantData';
import { StorageKeyEnum } from '../../constants';

class RestaurantComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('name');
    //TODO: 초기 렌더링 시, 로컬 스토리지에 초기 데이터 넣어주면 로컬 스토리지만 사용
    const localStorageItem = window.localStorage.getItem(
      StorageKeyEnum.restaurants,
    );
    const storeData = localStorageItem
      ? (JSON.parse(localStorageItem) as RestaurantInfo[])
      : INITIAL_RESTAURANT_DATA;

    const store = storeData.find((data) => data.name === storeName);

    if (store) {
      const iconHTML = `<category-icon category="${store.category}"></category-icon>`;

      this.innerHTML = /*html*/ `
      <li class="restaurant">
          ${iconHTML}
          <div class="restaurant__info">
            <h3 class="restaurant__info__title">
              ${store.name}
            </h3>
            <p class="restaurant__info__distance"> 캠퍼스부터 ${store.distance}분 내</p>
            <p class="restaurant__info__explanation">
              ${store.description ? store.description : '<span class="none-description">상점 설명이 존재하지 않습니다.</span>'}
            </p>
          </div>
        </li>
        `;
    } else {
      this.innerHTML = '<p>해당 상점을 찾을 수 없습니다.</p>';
    }
  }
}
customElements.define('restaurant-box', RestaurantComponent);
