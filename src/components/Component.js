class Component extends HTMLElement {
  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  setEvent() {}

  removeEvent() {}

  makeCustomEvent(name, detail) {
    return this.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
  }

  template() {
    return ``;
  }
}

export default Component;
