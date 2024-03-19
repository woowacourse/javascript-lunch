import { CATEGORIES } from '../../constants/categories';
import { SORTBY } from '../../constants/sortBy';
import { Category, SortBy } from '../../types';
import textInput from '../../utils/textInput';

const LUNCH_DROPDOWN_TEMPLATE = /* HTML */ `
  <select name="dropdown" id="dropdown-filter" class="restaurant-filter"></select>
`;

const DROPDOWN_OPTION_TEMPLATE = (value: string) => /* HTML */ `
  <option value=${value === '전체' ? '' : value}>${value}</option>
`;

class LunchDropdown extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderOptions();
    this.setEventListener();
  }

  render(): void {
    this.innerHTML = LUNCH_DROPDOWN_TEMPLATE;
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
      optionItems.push(DROPDOWN_OPTION_TEMPLATE('전체'));
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
        return DROPDOWN_OPTION_TEMPLATE(value);
      }),
    );
    textInput.setInnerHtml.call(this, '.restaurant-filter', optionItems);
  }
}

customElements.define('lunch-dropdown', LunchDropdown);
