import { $ } from '../../util/dom.js';

class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.setEvent();
  }

  connectedCallback() {}

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {}

  setEvent() {}

  removeEvent() {}

  getTemplate(selector) {
    const instance = $(selector).content.cloneNode(true);
    this.appendChild(instance);
  }

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
