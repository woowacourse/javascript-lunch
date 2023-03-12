import style from '../style/style';

abstract class RComponent extends HTMLElement {
  constructor() {
    super();

    if ((this.constructor as typeof RComponent).useShadowDom()) {
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
    if ((this.constructor as typeof RComponent).useShadowDom()) {
      this.shadowRoot!.innerHTML = this.renderTemplate();
      return;
    }
    this.innerHTML = this.renderTemplate();
  }

  connectedCallback() {
    this.render();
  }
}

export default RComponent;