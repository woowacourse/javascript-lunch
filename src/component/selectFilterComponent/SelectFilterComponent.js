import { CATEGORY, SORTING_KEY, EVENT, DEFAULT } from '../../types/types.ts';
import { $ } from '../../util/dom.js';
import BaseComponent from '../baseComponent/BaseComponent.js';

class SelectFilterComponent extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    const instance = this.getTemplate('#select-filter-template');
    const filterType = this.getAttribute('id');

    this.render(instance, filterType);
    this.setEvent();
  }

  render(instance, filterType) {
    const $select = $('.restaurant-filter', instance);

    if (filterType === 'category-filter') {
      this.#createOptions(CATEGORY, $select);
      $select.name = DEFAULT.category;
    } else {
      this.#createOptions(SORTING_KEY, $select);
      $select.name = DEFAULT.sortingKey;
    }

    this.appendChild(instance);
  }

  #createOptions(filterType, $select) {
    Object.values(filterType).forEach((optionName) => {
      const $option = document.createElement('option');
      $option.innerText = optionName;
      $select.appendChild($option);
    });
  }

  setEvent() {
    this.on(
      { target: $('.restaurant-filter', this), eventName: 'change' },
      this.#handleSelectChange.bind(this)
    );
  }

  removeEvent() {
    this.off(
      { target: $('.restaurant-filter', this), eventName: 'change' },
      this.#handleSelectChange.bind(this)
    );
  }

  #handleSelectChange(event) {
    try {
      const selectedValue = event.target.value;
      const $select = $('.restaurant-filter', this);
      $select.setAttribute('name', selectedValue);
      this.emit(EVENT.filter);
    } catch {
      throw new Error();
    }
  }
}

customElements.define('select-filter', SelectFilterComponent);
