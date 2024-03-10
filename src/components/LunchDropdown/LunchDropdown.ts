import { CATEGORIES } from '../../constants/categories';
import { SORTBY } from '../../constants/sortBy';
import { Category, SortBy } from '../../types';

const LUNCH_DROPDOWN = `
  <select name="dropdown" id="dropdown-filter" class="restaurant-filter"></select>
`;

const DROPDOWN_OPTION = (value: string) => `
  <option value=${value === '전체' ? '' : value}>${value}</option>
`;

class LunchDropdown extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderOptions();
    this.setEventListener();
  }

  render(): void {
    this.innerHTML = LUNCH_DROPDOWN;
  }

  setEventListener(): void {
    const select = this.querySelector('select');
    select?.addEventListener('change', () => {
      this.setDropdownEvent();
    });
  }

  setDropdownEvent() {
    const changeDropdownEvent = new CustomEvent('changeDropdown', {
      bubbles: true,
    });
    this.dispatchEvent(changeDropdownEvent);
  }

  renderOptions(): void {
    const optionsAttribute = this.getAttribute('options');
    const optionItems: string[] = [];
    if (optionsAttribute === 'category') {
      optionItems.push(DROPDOWN_OPTION('전체'));
      this.handleOptionItems(optionItems, CATEGORIES);
    }
    if (optionsAttribute === 'sortBy') {
      this.handleOptionItems(optionItems, SORTBY);
    }
  }

  handleOptionItems(optionItems: string[], object: typeof CATEGORIES | typeof SORTBY) {
    optionItems.push(
      ...Object.values(object).map((element) => {
        const value = element as Category | SortBy;
        return DROPDOWN_OPTION(value);
      }),
    );
    this.inputOptionItems(optionItems);
  }

  inputOptionItems(optionItems: string[]) {
    const options = this.querySelector('.restaurant-filter');
    if (options) {
      options.innerHTML = optionItems.join('');
    }
  }
}

customElements.define('lunch-dropdown', LunchDropdown);
