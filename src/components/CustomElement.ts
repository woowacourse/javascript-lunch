abstract class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.render();
  }

  abstract renderTemplate(): string;

  render() {
    this.innerHTML = this.renderTemplate();
  }

  connectedCallback() {
    this.render();
  }
}

export default CustomElement;
