import Component from './Component';
import { OPTIONS_MAP } from '../constants/Condition';
import { $addEvent, $removeEvent } from '../utils/dom';

class FilterBox extends Component {
  #type: string;

  constructor() {
    super();
    this.#type = this.getAttribute('type') || '';
  }

  setEvent() {
    if (this.#type === 'category' || this.#type === 'sorting') {
      $addEvent(`.${this.#type}`, 'change', this.#updateRestaurantList);
    }
  }

  removeEvent() {
    if (this.#type === 'category' || this.#type === 'sorting') {
      $removeEvent(`.${this.#type}`, 'change', this.#updateRestaurantList);
    }
  }

  #updateRestaurantList = () => this.makeCustomEvent('updateRestaurantList');

  template() {
    return `
      <select name=${this.#type} id=${this.#type} class=${this.#type}>
        ${OPTIONS_MAP[this.#type].map((el) => `<option value=${el.value}>${el.name}</option>`).join('')}
      </select>
    `;
  }
}

export default FilterBox;
