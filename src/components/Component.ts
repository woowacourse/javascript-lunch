import style from '../style/style';

abstract class Component extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [style];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.render();
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
