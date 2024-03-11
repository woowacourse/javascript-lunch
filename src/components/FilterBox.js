import Component from './Component';
import { OPTIONS_MAP } from '../constants/Condition';

class FilterBox extends Component {
  #type;

  constructor() {
    super();
    this.#type = this.getAttribute('type');
  }

  template() {
    return `
      <select name=${this.#type} id=${this.#type} class=${this.#type}>
        ${OPTIONS_MAP[this.#type].map((el) => `<option value=${el.value}>${el.name}</option>`).join('')}
      </select>
    `;
  }
}

export default FilterBox;
