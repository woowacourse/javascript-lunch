import { $ } from '../../util/dom.js';

class BaseComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {}

  disconnectedCallback() {
    this.removeEvent();
  }

  getTemplate(selector) {
    return $(selector).content.cloneNode(true);
  }

  render(instance) {
    this.appendChild(instance);
  }

  setEvent() {}

  removeEvent() {}

  emit(eventType, detail) {
    const customEvent = new CustomEvent(eventType, {
      bubbles: true,
      detail
    });

    this.dispatchEvent(customEvent);
  }

  on({ target, eventName }, eventHandler) {
    target.addEventListener(eventName, eventHandler);
  }

  off({ target, eventName }, eventHandler) {
    target.removeEventListener(eventName, eventHandler);
  }
}

export default BaseComponent;
