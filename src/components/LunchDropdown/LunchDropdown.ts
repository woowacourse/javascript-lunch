import { CATEGORIES } from '../../constants/categories';
import { SORTBY } from '../../constants/sortBy';

type DropdownOptionsTable = {
  [keys: string]: Record<string, string | number>;
};

const LUNCH_DROPDOWN = `
  <select name="dropdown" id="dropdown-filter" class="restaurant-filter"></select>
`;

const DROPDOWN_OPTION = (value: string) => `
  <option value=${value === '전체' ? '' : value}>${value}</option>
`;

class LunchDropdown extends HTMLElement {
  DROPDOWN_OPTIONS_TABLE: DropdownOptionsTable = {
    category: CATEGORIES,
    sortBy: SORTBY,
  };

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
      const changeDropdownEvent = new CustomEvent('changeDropdown', {
        bubbles: true,
      });
      this.dispatchEvent(changeDropdownEvent);
    });
  }

  renderOptions(): void {
    const optionsAttribute = this.getAttribute('options') ?? '';
    const optionItems: string[] = [];
    this.appendDropdownOptions(optionsAttribute, optionItems);
    const options = this.querySelector('.restaurant-filter');

    if (options) {
      options.innerHTML = optionItems.join('');
    }
  }

  appendDropdownOptions(option: string, optionItems: string[]) {
    if (option === 'category') {
      optionItems.push(DROPDOWN_OPTION('전체'));
    }
    Object.values(this.DROPDOWN_OPTIONS_TABLE[option]).forEach((element) => {
      optionItems.push(DROPDOWN_OPTION(`${element}`));
    });
  }
}

customElements.define('lunch-dropdown', LunchDropdown);
