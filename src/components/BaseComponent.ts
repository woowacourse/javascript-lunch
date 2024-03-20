import { TotalMenuAppEvent } from "../types/event";

export default class BaseComponent extends HTMLElement {
  constructor() {
    super();
  }

  protected connectedCallback() {
    this.render();
    this.setEvent();
  }

  protected disconnectedCallback() {}

  protected render() {}

  protected setEvent() {}

  protected emitEvent<T>(event: TotalMenuAppEvent, data?: T) {
    this.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
        detail: data,
      })
    );
  }
}
