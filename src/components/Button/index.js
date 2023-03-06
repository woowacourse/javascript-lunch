import './index.css';

class Button extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const color = this.getAttribute('color');

    this.innerHTML = `
    <button type="button" id=${id} class="button button--${color} text-caption">${name}</button>
    `;
  }

  static get observedAttributes() {
    return ['name', 'color', 'id'];
  }

  attributeChangedCallback(name) {
    if (name === 'name' && name === 'color' && name === 'id') {
      this.connectedCallback();
    }
  }
}

export default Button;
