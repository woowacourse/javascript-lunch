import './style.css';
import { findStoreFromLocalStorage } from '../../utils';

class RestaurantDistance extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('store-name');
    const store = findStoreFromLocalStorage(storeName);

    if (store) {
      const $p = document.createElement('p');
      $p.className = 'restaurant__info__distance';
      $p.textContent = `캠퍼스부터 ${store.distance}분 내`;

      this.appendChild($p);
    }
  }
}

customElements.define('restaurant-distance', RestaurantDistance);
