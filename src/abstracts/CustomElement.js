class CustomElement extends HTMLElement {
  connectedCallback() {
    this.render();
    this.handleEvent();
  }

  render() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template();
  }

  template() {}

  handleEvent() {}

  rerender(data, action) {}
}

export default CustomElement;
