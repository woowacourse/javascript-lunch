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

  makeCustomEvent(name, detail) {
    return this.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
  }

  template() {
    return ``;
  }
}

export default Component;
