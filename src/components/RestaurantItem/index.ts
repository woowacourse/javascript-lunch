import './style.css';

import {
  findRestaurant,
  getFavoriteAttributeValue,
  openModal,
} from '../../utils';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('name');

    const store = findRestaurant(storeName);
    if (!store) return;

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
      this.#handleClickToOpenInfoModal(event, store.name),
    );
  }

  #handleClickToOpenInfoModal(event: MouseEvent, storeName: string) {
    event.stopPropagation();

    openModal(
      `<restaurant-info-modal-inner store-name="${storeName}"></restaurant-info-modal-inner>`,
    );
  }
}

customElements.define('restaurant-item', RestaurantItem);
