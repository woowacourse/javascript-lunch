class BaseComponent extends HTMLElement {
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

  emit(eventType: string, detail: EventInit) {
    const customEvent = new CustomEvent(eventType, {
      bubbles: true,
      detail,
    });
    this.dispatchEvent(customEvent);
  }

  on(target: HTMLElement, eventName: string, eventHandler: EventListenerOrEventListenerObject) {
    target.addEventListener(eventName, eventHandler);
  }

  off(target: HTMLElement, eventName: string, eventHandler: EventListenerOrEventListenerObject) {
    target.removeEventListener(eventName, eventHandler);
  }
}

export default BaseComponent;
