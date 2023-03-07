import style from '../style/style';

abstract class Component extends HTMLElement {
  constructor() {
    super();

    if ((this.constructor as typeof Component).useShadowDom()) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot!.adoptedStyleSheets = [style];
    }
  }

  static useShadowDom() {
    return true;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.render();
  }

  abstract renderTemplate(): string;

  render() {
    if ((this.constructor as typeof Component).useShadowDom()) {
      this.shadowRoot!.innerHTML = this.renderTemplate();
      return;
    }
    this.innerHTML = this.renderTemplate();
  }

  connectedCallback() {
    this.render();
  }
}

export default Component;
