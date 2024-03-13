import './style.css';
import { StorageKeyEnum } from '../../constants';
import { RestaurantInfo } from '../../types';
import {
  FilteringController,
  ChangeLikeDataController,
  ShowRestaurantDetailsModalController,
} from '../../services';
import findParentBox from '../../utils/findParentBox';

class RestaurantInfoModalInner extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const storeName = this.getAttribute('name');
    const localStorageItem = window.localStorage.getItem(
      StorageKeyEnum.restaurants,
    );

    if (localStorageItem !== null && storeName) {
      const storeData: RestaurantInfo[] = JSON.parse(localStorageItem);
      const store = storeData.find((data) => data.name === storeName);

      if (store) {
        const iconHTML = `<category-icon category="${store.category}"></category-icon>`;

        this.innerHTML = /*html*/ `
        ${iconHTML}
        <star-btn isLike="${store.like}"></star-btn>
        <h3 class="restaurant-info-modal__title">${store.name}</h3>
        <p class="restaurant-info-modal__distance">캠퍼스부터 ${store.distance}분 내</p>
        <p class="restaurant-info-modal__explanation">${store.description ? store.description : '<span class="none-description">가게 설명이 존재하지 않습니다.</span>'}</p>
        ${store.link ? `<a class="restaurant-info-modal__link" href="${store.link}" target="_blank">${store.name} 가게 정보 바로가기</a>` : ''}
        <div class="restaurant-info-modal__btn-box">
        <default-btn color="white" text="닫기" id="close-store-info"></default-btn>
        <default-btn color="red" text="삭제하기" id="delete-store"></default-btn>
        </div>
        `;
      }

      this.querySelector('star-btn')?.addEventListener(
        'click',
        function (event) {
          ChangeLikeDataController.toggleLikeStatus(
            event as MouseEvent,
            'RESTAURANT-INFO-MODAL-INNER',
          );
          const clickEl = event.target as HTMLElement;
          const clickedRestaurantEl = findParentBox(
            clickEl,
            'RESTAURANT-INFO-MODAL-INNER',
          );
          if (clickedRestaurantEl) {
            ShowRestaurantDetailsModalController.showModal(clickedRestaurantEl);
          }
        },
      );

      const deleteBtn = this.querySelector('#delete-store');
      const closeStoreInfoBtn = this.querySelector('#close-store-info');
      closeStoreInfoBtn?.addEventListener('click', this.#closeModal);
      deleteBtn?.addEventListener('click', () =>
        this.#deleteStoreData(storeData, storeName),
      );
    }
  }

  #deleteStoreData(storeData: RestaurantInfo[], storeName: string) {
    const newData = storeData.filter(
      (item: { name: string }) => item.name !== storeName,
    );
    window.localStorage.setItem(
      StorageKeyEnum.restaurants,
      JSON.stringify(newData),
    );
    this.#closeModal();
    FilteringController.showFilteredSortedList();
  }

  #closeModal() {
    const modalEl = document
      .querySelector('custom-modal')
      ?.shadowRoot?.querySelector('.modal');

    if (modalEl) {
      modalEl.classList.toggle('open');
      const childSlotEl = document.querySelector('[slot="child"]');
      if (childSlotEl) {
        childSlotEl.innerHTML = '';
      }

      const bodyEl = document.querySelector('body');
      if (bodyEl) bodyEl.style.overflowY = 'scroll';
    }
  }
}

customElements.define('restaurant-info-modal-inner', RestaurantInfoModalInner);
