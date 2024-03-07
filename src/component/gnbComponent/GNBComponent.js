import BaseComponent from '../baseComponent/BaseComponent.js';

class GNBComponent extends BaseComponent {
  constructor() {
    super();
    this.setEvent();
  }

  connectedCallback() {
    this.getTemplate('#gnb-template');
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {}

  setEvent() {}

  removeEvent() {}
}

customElements.define('g-n-b', GNBComponent);
