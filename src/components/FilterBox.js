import Component from './Component';
import { $, $addEvent, $removeEvent } from '../utils/dom';

class FilterBox extends Component {
  static observedAttributes = ['type', 'option'];

  #type;
  #option;

  constructor() {
    super();

    this.#type = this.getAttribute('type');
    this.#option = JSON.parse(this.getAttribute('option'));
  }

  attributeChangedCallback() {
    this.#type = this.getAttribute('type');
    this.#option = JSON.parse(this.getAttribute('option'));

    this.render();
  }

  setEvent() {
    $addEvent(`.${this.#type}`, 'change', () => this.makeCustomEvent('selectChange'));
  }

  removeEvent() {
    $removeEvent(`.${this.#type}`, 'change', () => this.makeCustomEvent('selectChange'));
  }

  template() {
    return `
    <label for="${this.#type}" class="sr-only">${
      this.#type === 'category' ? '카테고리 별로 ' : '이름순 또는 거리순으로 '
    }음식점을 필터링할 수 있습니다.</label>
      <select name=${this.#type} id=${this.#type} class=${this.#type}>
        ${this.#option.map((el) => `<option value=${el.value}>${el.name}</option>`).join('')}
      </select>
    `;
  }
}

export default FilterBox;
