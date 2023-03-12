import style from '../style/index.css';

abstract class Component extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = this.getCSSStyleSheets();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.render();
  }

  getCSSStyleSheets() {
    return [style];
  }

  abstract renderTemplate(): string;

  render() {
    this.shadowRoot!.innerHTML = this.renderTemplate();
  }

  connectedCallback() {
    this.render();
  }
}

export default Component;
