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

  show() {
    this.removeAttribute("hidden");
  }

  hide() {
    this.setAttribute("hidden", true);
  }
}

export default CustomElement;
