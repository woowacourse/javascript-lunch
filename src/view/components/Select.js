export const SELECT_EVENTS = {
  onchange: 'selectOnChange',
};

export default class Select extends HTMLSelectElement {
  static observedAttributes = ['data-options'];

  get options() {
    if (!this.dataset.options) {
      return [];
    }
    return JSON.parse(this.dataset.options);
  }

  set options(value) {
    this.setAttribute('data-options', JSON.stringify(value));
  }

  connectedCallback() {
    this.addEventListener('change', this.#handleOnChange.bind(this));
  }

  attributeChangedCallback(name) {
    if (name === 'data-options') {
      this.#createOptions();
    }
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
    this.textContent = '';

    const fragment = document.createDocumentFragment();
    this.#generateOptions().forEach((option) => fragment.appendChild(option));
    this.appendChild(fragment);
  }

  #generateOptions() {
    return this.options.map(({ value, option }) => {
      const element = document.createElement('option');
      element.value = value;
      element.textContent = option;
      return element;
    });
  }
}
