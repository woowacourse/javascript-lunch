import './style.css';

class NoneRestaurant extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const $noneRestaurant = document.createElement('p');
    $noneRestaurant.textContent = '찾으시는 음식점이 없습니다.';

    this.appendChild($noneRestaurant);
  }
}

customElements.define('none-restaurant', NoneRestaurant);
