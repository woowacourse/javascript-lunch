import { RestaurantInfo } from '../../types';
import './style.css';
import { INITIAL_RESTAURANT_DATA } from '../../data/restaurantData';
import { StorageKeyEnum } from '../../constants';
import { ChangeLikeDataController, LocalStorageService } from '../../services';
class RestaurantComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('name');

    const localStorageItem = LocalStorageService.getData(
      StorageKeyEnum.restaurants,
    );

    const storeData: RestaurantInfo[] = localStorageItem
      ? localStorageItem
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
              ${store.description ? store.description : '<span class="none-description">가게 설명이 존재하지 않습니다.</span>'}
            </p>
          </div>
          <star-btn isLike="${store.like}"></star-btn>
        </li>
        `;
    } else {
      this.innerHTML = '<p>해당 상점을 찾을 수 없습니다.</p>';
    }
    this.querySelector('star-btn')?.addEventListener('click', function (event) {
      ChangeLikeDataController.toggleLikeStatus(
        event as MouseEvent,
        'RESTAURANT-BOX',
      );
    });
  }
}
customElements.define('restaurant-box', RestaurantComponent);
