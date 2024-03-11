type EventListener = (this: Element, event: Event) => void;

class BaseComponent extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }
  render() {}
  setEvent() {}
}

export default BaseComponent;
