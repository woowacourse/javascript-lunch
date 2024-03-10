import * as xssFilters from 'xss-filters';

import './style.css';

class CustomInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const id = this.getAttribute('id');
    const type = this.getAttribute('type');
    const name = this.getAttribute('name');
    const required = this.getAttribute('required');
    const placeholder = this.getAttribute('placeholder');
    const maxlength = this.getAttribute('maxlength');

    const inputEl = document.createElement('input');

    const inputAttributes = {
      id: id,
      type: type,
      name: `${name}`,
      required: required,
      placeholder: placeholder,
      maxlength: maxlength,
    };

    Object.entries(inputAttributes).forEach(([key, value]) => {
      if (value) {
        key === 'required'
          ? (inputEl.required = true)
          : inputEl.setAttribute(key, value);
      }
    });
    this.appendChild(inputEl);

    this.querySelector('input')?.addEventListener('change', (event) =>
      this.#handleChange(event),
    );
  }
  addChange(fn: () => void) {}
  #handleChange(event: Event) {
    const eventTarget = event.target;

    if (eventTarget instanceof HTMLInputElement) {
      const { value } = eventTarget;

      eventTarget.value = xssFilters.inHTMLData(value);
    }
  }
}

customElements.define('custom-input', CustomInput);
