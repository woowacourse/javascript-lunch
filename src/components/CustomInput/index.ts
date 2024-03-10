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

    this.innerHTML = /* html */ `
    <input  
      type="${type}" 
      name="${name}" 
      id="${id}" 
      ${required ? 'required' : ''}  
      ="${placeholder || ''}" 
      ${maxlength ? `maxlength=${maxlength}` : ''} 
    />
    `;

    this.querySelector('input')?.addEventListener('change', (event) =>
      this.#handleChange(event),
    );
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
