import BaseComponent from "./BaseComponent";

import { $ } from "../utils/selector";

type Selector = string;

export type EventListenerRegistration = {
  target: Element | Document | Selector | null;
  eventName: string;
  handler: (e: Event) => void;
};
export default abstract class EventComponent extends BaseComponent {
  protected eventHandlerRegistrations: EventListenerRegistration[] = [];

  connectedCallback() {
    this.init();
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  protected init() {
    this.render();
    this.setEvent();
  }

  protected dispatchCustomEvent(
    eventName: string,
    detail: Record<string, unknown>
  ) {
    this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true }));
  }

  private setEvent() {
    this.eventHandlerRegistrations.forEach(({ target, eventName, handler }) => {
      const targetElem = typeof target === "string" ? $(target) : target;

      targetElem?.addEventListener(eventName, handler);
    });
  }

  private removeEvent() {
    this.eventHandlerRegistrations.forEach(({ target, eventName, handler }) => {
      const targetElem = typeof target === "string" ? $(target) : target;

      targetElem?.addEventListener(eventName, handler);
    });
  }
}
