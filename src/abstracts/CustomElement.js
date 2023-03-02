class CustomElement extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    this.insertAdjacentHTML("beforeend", this.template());
  }

  template() {}

  setEvent() {}
}

export default CustomElement;
