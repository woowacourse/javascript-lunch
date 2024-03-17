import './style.css';

import LunchDropdown, { LunchDropdownProps } from '../LunchDropdown/LunchDropdown';
import { CATEGORIES } from '../../constants/categories';
import { SORTBY } from '../../constants/sortBy';

const DROPDOWN_PROPS = [
  {
    name: 'category-dropdown',
    id: 'category-dropdown',
    className: 'restaurant-filter',
    options: CATEGORIES,
    defaultValue: '전체',
  },
  {
    name: 'sortby-dropdown',
    id: 'sortby-dropdown',
    className: 'restaurant-filter',
    options: SORTBY,
  },
];

class LunchItemFilter extends HTMLElement {
  constructor() {
    super();
    this.className = 'restaurant-filter-container';
    this.createDropdowns();
    this.setEventListener();
  }

  createDropdowns() {
    DROPDOWN_PROPS.forEach((dropdownProps) => {
      this.createDropdown(dropdownProps);
    });
  }

  setEventListener() {
    this.addEventListener('changeDropdown', () => {
      this.handleRender();
    });
  }

  createDropdown(props: LunchDropdownProps) {
    this.appendChild(new LunchDropdown(props));
  }

  handleRender() {
    const renderEvent = new CustomEvent('render', { bubbles: true });
    this.dispatchEvent(renderEvent);
  }

  resetDropdowns() {
    this.querySelectorAll('select').forEach((element) => {
      element.options[0].selected = true;
    });
  }
}

customElements.define('lunch-item-filter', LunchItemFilter);

export default LunchItemFilter;
