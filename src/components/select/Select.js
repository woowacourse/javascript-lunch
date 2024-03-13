import SELECT_OPTIONS from '../../statics/constants/selectOptions';

import './Select.css';

export const SELECT_EVENTS = {
  onchange: 'selectOnChange',
};

export default class Select extends HTMLSelectElement {
  static observedAttributes = ['type'];

  get type() {
    return this.getAttribute('type');
  }

  connectedCallback() {
    this.addEventListener('change', this.#handleOnChange.bind(this));
  }

  attributeChangedCallback() {
    this.#createOptions();
  }

  // eslint-disable-next-line
  #handleOnChange(e) {
    const { value } = e.target;

    this.dispatchEvent(
      new CustomEvent(SELECT_EVENTS.onchange, {
        bubbles: true,
        detail: {
          value,
          id: this.id,
        },
      }),
    );
  }

  #createOptions() {
    this.innerHTML = '';

    const fragment = document.createDocumentFragment();
    this.#generateOptions().forEach((option) => fragment.appendChild(option));
    this.appendChild(fragment);
  }

  #generateOptions() {
    const options = SELECT_OPTIONS.get(this.type) || [];
    return options.map(({ value, option }) => {
      const element = document.createElement('option');
      element.value = value;
      element.innerHTML = option;
      return element;
    });
  }
}
