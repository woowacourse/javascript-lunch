import { CATEGORIES } from '../../constants/categories';
import { SORTBY } from '../../constants/sortBy';

export type LunchDropdownProps = {
  name: string;
  id: string;
  className: string;
  options: Record<string, string>;
  defaultValue?: string;
};
type DropdownOptionsTable = {
  [keys: string]: Record<string, string | number>;
};

class LunchDropdown extends HTMLSelectElement {
  DROPDOWN_OPTIONS_TABLE: DropdownOptionsTable = {
    category: CATEGORIES,
    sortBy: SORTBY,
  };

  constructor(props: LunchDropdownProps) {
    super();
    const { name, id, className, options, defaultValue } = props;
    this.name = name;
    this.id = id;
    this.classList.add(className);
    this.createOptions(options, defaultValue);
  }

  createOptions(options: Record<string, string>, defaultValue?: string) {
    if (defaultValue) {
      this.insertAdjacentHTML('beforeend', `<option value=''>${defaultValue}</option>`);
    }
    Object.values(options).forEach((value) => {
      this.insertAdjacentHTML('beforeend', `<option value=${value}>${value}</option>`);
    });
  }
}

customElements.define('lunch-dropdown', LunchDropdown, { extends: 'select' });

export default LunchDropdown;
