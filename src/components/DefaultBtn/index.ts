import './style.css';

import { Attributes, BtnType, DefaultBtnColor } from '../../types';
import { setObjectAttribute } from '../../utils';

class DefaultBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const defaultBtnColor: DefaultBtnColor = 'red';
    const defaultBtnType: BtnType = 'button';
    const attributes: Attributes = {
      class: `btn-color-${this.getAttribute('color') || defaultBtnColor}`,
      type: this.getAttribute('type') || defaultBtnType,
    };

    const btnEl = setObjectAttribute(
      attributes,
      document.createElement('button'),
    );

    btnEl.textContent = this.getAttribute('text');

    this.appendChild(btnEl);
  }
}

customElements.define('default-btn', DefaultBtn);
