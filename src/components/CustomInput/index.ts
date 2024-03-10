import * as xssFilters from 'xss-filters';

import './style.css';
import { setObjectAttribute } from '../../utils';

class CustomInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const attributes = {
      id: this.getAttribute('id'),
      type: this.getAttribute('type'),
      name: this.getAttribute('name'),
      required: this.getAttribute('required'),
      placeholder: this.getAttribute('placeholder'),
      maxlength: this.getAttribute('maxlength'),
    };

    const inputEl = setObjectAttribute(
      attributes,
      document.createElement('input'),
    );

    this.appendChild(inputEl);

    inputEl.addEventListener('change', (event) => this.#handleChange(event));
  }

  #handleChange(event: Event) {
    const eventTarget = event.target;

    if (eventTarget instanceof HTMLInputElement) {
      const { value } = eventTarget;

      eventTarget.value = xssFilters.inHTMLData(value);
    }
  }
}

customElements.define('custom-input', CustomInput);
