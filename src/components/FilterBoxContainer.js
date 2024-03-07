import Component from './Component';
import { OPTION } from '../constants/Condition';
import { $, $setAttribute } from '../utils/dom';

class FilterBoxContainer extends Component {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return `
      <section class="restaurant-filter-container">
          <filter-box type="category" option='${JSON.stringify([OPTION.ALL, ...OPTION.CATEGORY])}'></filter-box>
          <filter-box type="sorting" option='${JSON.stringify(OPTION.SORTING)}'></filter-box>
      </section>
    `;
  }
}

export default FilterBoxContainer;
