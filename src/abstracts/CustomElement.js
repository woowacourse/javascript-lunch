class CustomElement extends HTMLElement {
  connectedCallback() {
    this.render();
    this.handleEvent();
  }

  render() {
    this.insertAdjacentHTML("beforeend", this.template());
  }

  template() {}

  handleEvent() {}

  rerender(data, action) {}
}

export default CustomElement;
