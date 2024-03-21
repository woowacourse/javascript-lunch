import Component from '../_core/Component';
import { $addEvent } from '../../utils/dom';
import { OPTIONS_MAP } from '../../constants/Condition';

import './FilterBox.css';

class FilterBox extends Component {
  #type: string;

  constructor() {
    super();
    this.#type = this.getAttribute('type') ?? '';
  }

  setEvent(): void {
    if (this.#type === 'category' || this.#type === 'sorting') {
      $addEvent(this, `.${this.#type}`, 'change', this.#updateRestaurantList.bind(this));
    }
  }

  #updateRestaurantList() {
    this.makeCustomEvent('updateRestaurantList');
  }

  template(): string {
    return `
      <select name=${this.#type} id=${this.#type} class=${this.#type}>
        ${OPTIONS_MAP[this.#type].map((el) => `<option value=${el.value}>${el.name}</option>`).join('')}
      </select>
    `;
  }
}

export default FilterBox;
