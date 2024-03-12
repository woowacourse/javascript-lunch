import './style.css';

class RestaurantName extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const storeName = this.getAttribute('store-name');

    const $h3 = document.createElement('h3');
    $h3.className = 'restaurant__info__name';
    $h3.textContent = storeName;

    this.appendChild($h3);
  }
}

customElements.define('restaurant-name', RestaurantName);
