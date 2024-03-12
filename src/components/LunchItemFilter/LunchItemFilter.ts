import './style.css';

import LunchDropdown, { LunchDropdownProps } from '../LunchDropdown/LunchDropdown';
import LunchItems from '../LunchItems/LunchItems';
import { CATEGORIES } from '../../constants/categories';
import { SORTBY } from '../../constants/sortBy';

const LUNCH_ITEM_FILTER = `
  <section class="restaurant-filter-container"></section>
`;

class LunchItemFilter extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEventListener();
  }

  render() {
    this.innerHTML = LUNCH_ITEM_FILTER;
    this.createDropdown({
      name: 'dropdown',
      id: 'dropdown-filter',
      className: 'restaurant-filter',
      options: CATEGORIES,
      defaultValue: '전체',
    });
    this.createDropdown({
      name: 'dropdown',
      id: 'dropdown-filter',
      className: 'restaurant-filter',
      options: SORTBY,
    });
  }

  setEventListener() {
    this.addEventListener('changeDropdown', () => {
      this.handleRender();
    });
  }

  createDropdown(props: LunchDropdownProps) {
    this.querySelector('section')?.insertAdjacentElement('beforeend', new LunchDropdown(props));
  }

  handleRender() {
    const dropdowns = this.querySelectorAll('select');
    const array: string[] = [];
    dropdowns.forEach((dropdown) => {
      const select = dropdown;
      array.push(select?.value ?? '');
    });
    const items = document.querySelector('lunch-items') as LunchItems;
    items.renderItems({ category: array[0], sortBy: array[1] });
  }
}

customElements.define('lunch-item-filter', LunchItemFilter);

export default LunchItemFilter;
