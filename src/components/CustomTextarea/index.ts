import * as xssFilters from 'xss-filters';
import './style.css';

class CustomTextarea extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const id = this.getAttribute('id');
    const name = this.getAttribute('name');
    const cols = this.getAttribute('clos');
    const rows = this.getAttribute('rows');
    const placeholder = this.getAttribute('placeholder');

    this.innerHTML = `
    <textarea name="${name}" id="${id}" cols="${cols}" rows="${rows}" placeholder="${placeholder || ''}"></textarea>
    `;

    this.querySelector('textarea')?.addEventListener('change', (event) =>
      this.#handleChange(event),
    );
  }

  #handleChange(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    const { value } = eventTarget;

    if (eventTarget) {
      eventTarget.value = xssFilters.inHTMLData(value);
    }
  }
}
customElements.define('custom-textarea', CustomTextarea);
