import './style.css';

import { DefaultBtnColor } from '../../types/index.ts';

class DefaultBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const color = this.getAttribute('color');
    const text = this.getAttribute('text');
    const type = this.getAttribute('type');
    const defaultBtnColor: DefaultBtnColor = 'red';

    this.innerHTML = /* html */ `             
      <button
        type=${type || 'button'}
        class='btn-color-${color || defaultBtnColor}'
      >
        ${text}
      </button>
    `;
  }
}

customElements.define('default-btn', DefaultBtn);
