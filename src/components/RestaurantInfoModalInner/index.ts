import './style.css';

import RestaurantList from '../../domains/RestaurantList';
import { RestaurantListController } from '../../services';

import {
  closeModal,
  getFavoriteAttributeValue,
  findRestaurant,
} from '../../utils';

class RestaurantInfoModalInner extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('store-name');
    const store = findRestaurant(storeName);

    if (!store) {
      const $noneRestaurant = document.createElement('<none-restaurant>');
      this.appendChild($noneRestaurant);

      return;
    }

    this.innerHTML = /* html */ `
    <div class ="restaurant-info">
        <favorite-icon store-name= "${store.name}" favorite= "${getFavoriteAttributeValue(store.favorite)}">
        </favorite-icon>
        <category-icon category="${store.category}">
        </category-icon>
        <restaurant-name store-name="${store.name}">
        </restaurant-name>
        <restaurant-distance store-name="${store.name}">
        </restaurant-distance>
        <restaurant-description store-name="${store.name}">
        </restaurant-description>
        <p class="restaurant__info__link"></p>
    </div>
    <div class="restaurant-info-modal__btn-group">
      <default-btn color="white" text="삭제하기" id="btn-delete-store"></default-btn>
      <default-btn color="red" text="닫기" id="btn-close-info-modal"></default-btn>
    </div>
    `;

    if (store.link) {
      this.#addLinkElement(store.link);
    }

    this.#addEventToButton(store.name);
  }

  #addLinkElement(link: string) {
    const $link = this.querySelector('.restaurant__info__link');

    if ($link) {
      const $a = document.createElement('a');
      $a.href = link;
      $a.textContent = '🍴음식점 관련 페이지 바로가기';
      $a.target = '_blank';

      $link?.appendChild($a);
    }
  }

  #addEventToButton(storeName: string) {
    const $deleteBtn =
      this.querySelector('#btn-delete-store')?.querySelector('button');
    const $closeBtn = this.querySelector(
      '#btn-close-info-modal',
    )?.querySelector('button');

    if ($deleteBtn instanceof HTMLButtonElement) {
      $deleteBtn.addEventListener('click', (event) =>
        this.#handleClickToDeleteStore(event, storeName),
      );
    }

    if ($closeBtn instanceof HTMLButtonElement) {
      $closeBtn.addEventListener('click', (event) =>
        this.#handleClickToCloseModal(event),
      );
    }
  }

  #handleClickToCloseModal(event: MouseEvent) {
    event.stopPropagation();

    closeModal();
  }

  #handleClickToDeleteStore(event: MouseEvent, storeName: string) {
    event.stopPropagation();
    const restaurantList = new RestaurantList();

    restaurantList.deleteStore(storeName);

    const isOpenFavoriteList = document.querySelector(
      'favorite-restaurant-list',
    );

    if (isOpenFavoriteList) {
      RestaurantListController.injectFavoriteRestaurantList();
    } else {
      RestaurantListController.injectAllRestaurantList(restaurantList.list);
    }

    closeModal();
  }
}

customElements.define('restaurant-info-modal-inner', RestaurantInfoModalInner);
