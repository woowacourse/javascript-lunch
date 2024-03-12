export default class BaseComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  disconnectedCallback() {}

  render() {}

  setEvent() {}

  emitEvent(event, data) {
    this.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
        detail: data,
      })
    );
  }
}
