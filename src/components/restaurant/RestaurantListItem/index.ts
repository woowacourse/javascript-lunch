import Component from '../../Component';
import style from './index.css';

class RestaurantListItem extends Component {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  override renderTemplate() {
    return `
      <li>
        <div class="category">
          <img
            src="assets/categories/${this.getAttribute('category')}.png"
            alt="${this.getAttribute('category')}"
            class="category-icon"
          >
        </div>
        <div class="info">
          <h3 class="name text-subtitle">
            ${this.getAttribute('name') ?? ''}
          </h3>
          <span class="distance text-body">
            캠퍼스부터 ${this.getAttribute('distance' ?? '')}분 내
          </span>
          <p class="description text-body">${this.getAttribute('description') ?? ''}</p>
        </div>
      </li>
    `;
  }
}

customElements.define('r-restaurant-list-item', RestaurantListItem);

export default RestaurantListItem;
