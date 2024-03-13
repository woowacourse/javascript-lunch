import './style.css';

class ErrorMessageBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const $div = document.createElement('div');

    $div.textContent = this.getAttribute('message') || '';

    this.appendChild($div);
  }
}

customElements.define('error-message-box', ErrorMessageBox);
