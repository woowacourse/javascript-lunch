import { MENU_APP_EVENTS } from "../constants/event";

type MenuAppEvent =
  | keyof HTMLElementEventMap
  | (typeof MENU_APP_EVENTS)[keyof typeof MENU_APP_EVENTS];

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

  protected emitEvent<T>(event: MenuAppEvent, data?: T) {
    this.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
        detail: data,
      })
    );
  }
}
