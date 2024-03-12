import './style.css';

import '../LunchDropdown/LunchDropdown';
import LunchItems from '../LunchItems/LunchItems';
import { Category, SortBy } from '../../types';

const LUNCH_ITEM_FILTER = `
  <section class="restaurant-filter-container">
    <lunch-dropdown options="category"></lunch-dropdown>
    <lunch-dropdown options="sortBy"></lunch-dropdown>
  </section>
`;

class LunchItemFilter extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEventListener();
  }

  render() {
    this.innerHTML = LUNCH_ITEM_FILTER;
  }

  setEventListener() {
    this.addEventListener('changeDropdown', () => {
      this.handleRender();
    });
  }

  handleRender() {
    const dropdowns = this.querySelectorAll('lunch-dropdown');
    const array: string[] = [];
    dropdowns.forEach((dropdown) => {
      const select = dropdown.querySelector('select');
      array.push(select?.value ?? '');
    });
    const items = document.querySelector('lunch-items') as LunchItems;
    items.renderItems({ category: array[0] as Category, sortBy: array[1] as SortBy });
  }
}

customElements.define('lunch-item-filter', LunchItemFilter);

export default LunchItemFilter;
