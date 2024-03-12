import './style.css';

class ErrorMessageBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const divEl = document.createElement('div');

    divEl.textContent = this.getAttribute('message') || '';

    this.appendChild(divEl);
  }
}

customElements.define('error-message-box', ErrorMessageBox);
