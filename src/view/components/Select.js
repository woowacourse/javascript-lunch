export default class Select extends HTMLSelectElement {
  constructor() {
    super();
  }

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

  attributeChangedCallback() {
    this.#createOptions();
  }

  #createOptions() {
    this.innerHTML = '';

    const fragment = document.createDocumentFragment();
    // fragment.appendChild(this.#generateDefaultOption('선택해 주세요'));
    this.#generateOptions().forEach((option) => fragment.appendChild(option));

    this.appendChild(fragment);
  }

  // #generateDefaultOption(innerText) {
  //   const defaultOption = document.createElement('option');
  //   defaultOption.value = '';
  //   defaultOption.innerHTML = innerText;
  //   return defaultOption;
  // }

  #generateOptions() {
    return this.options.map(({ value, option }) => {
      const element = document.createElement('option');
      element.value = value;
      element.innerHTML = option;
      return element;
    });
  }
}
