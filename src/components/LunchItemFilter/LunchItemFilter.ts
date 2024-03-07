import './style.css';

import '../LunchDropdown/LunchDropdown';
import { CATEGORIES } from '../../constants/categories';

const LUNCH_ITEM_FILTER = `
<section class="restaurant-filter-container">
  <lunch-dropdown options="category"></lunch-dropdown>
  <lunch-dropdown options="sortBy"></lunch-dropdown>
</section>`;

class LunchItemFilter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LUNCH_ITEM_FILTER;
  }
}

customElements.define('lunch-item-filter', LunchItemFilter);
