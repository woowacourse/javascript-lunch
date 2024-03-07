class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {}

  setEvent() {}

  removeEvent() {}

  template() {
    return ``;
  }
}

export default Component;
