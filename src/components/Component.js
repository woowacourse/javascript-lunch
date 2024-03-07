class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
      this.initAttribute();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {}

  setEvent() {}

  removeEvent() {}

  initAttribute() {}

  template() {
    return ``;
  }
}

export default Component;
