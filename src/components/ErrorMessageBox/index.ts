import * as xssFilters from 'xss-filters';
import './style.css';

class ErrorMessageBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const message = this.getAttribute('message');

    this.innerHTML = /*html*/ `
    <div>${message || ''}</div>
    `;
  }
}

customElements.define('error-message-box', ErrorMessageBox);
