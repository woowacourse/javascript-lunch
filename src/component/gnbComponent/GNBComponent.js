import BaseComponent from '../baseComponent/BaseComponent.js';

class GNBComponent extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    const instance = this.getTemplate('#gnb-template');
    this.render(instance);
  }
}

customElements.define('g-n-b', GNBComponent);
