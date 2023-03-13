class CustomElement extends HTMLElement {
  state = {};

  connectedCallback() {
    this.initRender();
    this.handleEvent();
  }

  initRender() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template();
  }

  template() {}

  handleEvent() {}

  rerender(data, action) {}
}

export default CustomElement;
