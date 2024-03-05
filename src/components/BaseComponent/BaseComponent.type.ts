export type CustomEventType = "";

export interface EventHandler {
  target: HTMLElement;
  eventName: CustomEventType | keyof HTMLElementEventMap;
  eventHandler: EventListener;
}
