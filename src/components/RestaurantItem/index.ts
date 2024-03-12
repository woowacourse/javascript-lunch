import './style.css';

import {
  findStoreFromLocalStorage,
  getFavoriteAttributeValue,
  openModal,
} from '../../utils';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('name');

    const store = findStoreFromLocalStorage(storeName);

    if (store) {
      this.innerHTML = /* html */ `
      <li class="restaurant">
        <category-icon category="${store.category}"></category-icon>
        <div class="restaurant__info">
        <restaurant-name store-name="${store.name}"></restaurant-name>
          <restaurant-distance store-name="${store.name}"></restaurant-distance>
          <restaurant-description store-name="${store.name}"></restaurant-description>
          </div>
          <favorite-icon store-name= "${store.name}" favorite= "${getFavoriteAttributeValue(store.favorite)}"></favorite-icon>
        </li>
        `;

      this.addEventListener('click', (event) =>
        this.#handleClickToOpenInfoModal(event),
      );

      return;
    }

    this.innerHTML = /* html */ `<p>해당 상점을 찾을 수 없습니다.</p>`;
  }

  #handleClickToOpenInfoModal(event: MouseEvent) {
    event.stopPropagation();
    openModal('restaurant-info-modal-inner');
  }
}

customElements.define('restaurant-item', RestaurantItem);
