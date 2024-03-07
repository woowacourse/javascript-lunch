import { CATEGORIES } from '../../constants/categories';
import { SORTBY } from '../../constants/sortBy';
import { Category, SortBy } from '../../types';

// interface CategoryConstantType {
//   koreanFood: string;
//   chineseFood: string;
//   japaneseFood: string;
//   asianFood: string;
//   italianFood: string;
//   etc: string;
// }
// interface SortByConstantType {
//   newest: string;
//   oldest: string;
//   nameAscending: string;
//   nameDescending: string;
//   distanceAscending: string;
//   distanceDescending: string;
// }
// interface OptionsType {
//   category: CategoryConstantType;
//   sortBy: SortByConstantType;
// }

// const OPTIONS: OptionsType = {
//   category: CATEGORIES,
//   sortBy: SORTBY,
// };

// const OPTIONS = {
//   category: CATEGORIES,
//   sortBy: SORTBY,
// };

// type Union<T> = T[keyof T];
// type OptionAttributeType = Union<typeof Object.keys(OPTIONS)>;

const LUNCH_DROPDOWN = `
<select name="dropdown" id="dropdown-filter" class="restaurant-filter">
</select>`;

const DROPDOWN_OPTION = (value: string) => `
  <option value=${value}>${value}</option>
`;

class LunchDropdown extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderOptions();
  }

  render(): void {
    this.innerHTML = LUNCH_DROPDOWN;
  }

  renderOptions(): void {
    const optionsAttribute = this.getAttribute('options') ;
    const optionItems: string[] = [];
    if (optionsAttribute === 'category') {
      optionItems.push(DROPDOWN_OPTION("전체"));
      Object.values(CATEGORIES).forEach((element) => {
        optionItems.push(DROPDOWN_OPTION(element));
      });
    }
    if (optionsAttribute === 'sortBy') {
      Object.values(SORTBY).forEach((element) => {
        optionItems.push(DROPDOWN_OPTION(element));
      });
    }

    const options = this.querySelector('.restaurant-filter');
    if (options) {
      options.innerHTML = optionItems.join('');
    }
  }
}

customElements.define('lunch-dropdown', LunchDropdown);
