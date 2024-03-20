import './style.css';
import { findRestaurant } from '../../utils';

class RestaurantDistance extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('store-name');
    const store = findRestaurant(storeName);

    if (store) {
      const $distance = document.createElement('p');
      $distance.className = 'restaurant__info__distance';
      $distance.textContent = `캠퍼스부터 ${store.distance}분 내`;

      this.appendChild($distance);
    }
  }
}

customElements.define('restaurant-distance', RestaurantDistance);
