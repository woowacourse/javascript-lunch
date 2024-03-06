type EventListener = (this: Element, event: Event) => void;

class BaseComponent extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }
  render() {}
  setEvent() {}
  on(selector: string, type: keyof ElementEventMap, eventListener: EventListener) {
    document.querySelector(selector)?.addEventListener(type, eventListener);
  }
}

export default BaseComponent;
