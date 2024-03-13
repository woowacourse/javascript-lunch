import { CustomEventListener } from "./BaseComponent.type";

class BaseComponent extends HTMLElement {
  protected connectedCallback() {
    this.render();
    this.setEvent();
  }

  protected disconnectedCallback() {
    this.removeEvent();
  }

  protected render() {}

  protected setEvent() {}

  protected removeEvent() {}

  protected getTemplate() {
    return "";
  }

  protected emit<T>(eventType: string, detail?: T) {
    const customEvent = new CustomEvent(eventType, {
      bubbles: true,
      detail,
    });

    this.dispatchEvent(customEvent);
  }

  protected on({ target, eventName, eventHandler }: CustomEventListener) {
    target.addEventListener(eventName, eventHandler);
  }

  protected off({ target, eventName, eventHandler }: CustomEventListener) {
    target.removeEventListener(eventName, eventHandler);
  }
}

export default BaseComponent;
