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
      disabled: this.getAttribute('disabled'),
      id: this.getAttribute('id'),
    };

    const $btn = setObjectAttribute(
      attributes,
      document.createElement('button'),
    );

    $btn.textContent = this.getAttribute('text');

    this.appendChild($btn);
  }
}

customElements.define('default-btn', DefaultBtn);
