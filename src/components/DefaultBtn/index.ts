import './style.css';
import { Color, BtnType } from '../../types';
class AddBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const color = this.getAttribute('color') as Color;
    const text = this.getAttribute('text');
    const type = this.getAttribute('type') as BtnType;
    this.innerHTML = /*html*/ `             
      <button
        type=${type || 'button'}
        class='btn-color-${color}'
      >
        ${text}
      </button>
    `;
  }
}
customElements.define('default-btn', AddBtn);
