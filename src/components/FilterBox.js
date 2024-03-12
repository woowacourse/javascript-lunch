import Component from './Component';
import { $addEvent, $removeEvent } from '../utils/dom';
import { FILTER_OPTIONS, INPUT_OPTIONS } from '../constants/conditions';

class FilterBox extends Component {
  static observedAttributes = ['type', 'option'];

  #type;
  #handleSelectChange;

  constructor() {
    super();
    this.#type = this.getAttribute('type');
    this.#handleSelectChange = () => this.makeCustomEvent('selectChange');
  }

  attributeChangedCallback() {
    this.#type = this.getAttribute('type');
    this.render();
  }

  setEvent() {
    $addEvent(`.${this.#type}`, 'change', () => this.#handleSelectChange);
  }

  removeEvent() {
    $removeEvent(`.${this.#type}`, 'change', () => this.#handleSelectChange);
  }

  template() {
    const optionsHtml = [];

    if (this.#type === 'category' || this.#type === 'sorting') {
      const options = FILTER_OPTIONS[this.#type];
      Object.entries(options).forEach(([key, value]) => {
        optionsHtml.push(`<option value="${value.value}">${value.name}</option>`);
      });
    }

    if (this.#type === 'modalCategory' || this.#type === 'modalDistance') {
      const options = INPUT_OPTIONS[this.#type];
      Object.entries(options).forEach(([key, value]) => {
        optionsHtml.push(`<option value="${value.value}">${value.name}</option>`);
      });
    }

    return `
      <label for="${this.#type}" class="sr-only">${
      this.#type === 'category' ? '카테고리 별로 ' : '이름순 또는 거리순으로 '
    }음식점을 필터링할 수 있습니다.</label>
      <select name="${this.#type}" id="${this.#type}" class="${this.#type}">
        ${optionsHtml.join('')}
      </select>
    `;
  }
}

export default FilterBox;
