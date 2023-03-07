import './index.css';

class Button extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const color = this.getAttribute('color');
    const type = this.getAttribute('type');

    this.innerHTML = `
    <button type="${type}" id=${id} class="button button--${color} text-caption">${name}</button>
    `;
  }
}

export default Button;
