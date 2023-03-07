import { $ } from '../../utils';
import './index.css';

class RestaurantInfo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    const category = this.getAttribute('category');
    const distance = this.getAttribute('distance');
    const description = this.getAttribute('description') || '';

    this.innerHTML = `
    <li class="restaurant">
        <div class="restaurant__category">
          <img src="../../assets/category-${category}.png';" alt=${category} class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${description}</p>
        </div>
    </li>
    `;
  }

  static get observedAttributes() {
    return ['category', 'name', 'distance', 'description'];
  }

  attributeChangedCallback(name) {
    if (name === 'category' && name === 'name' && name === 'distance') {
      this.connectedCallback();
    }
  }
}

export default RestaurantInfo;
