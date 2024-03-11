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

  template() {
    return ``;
  }
}

export default Component;
