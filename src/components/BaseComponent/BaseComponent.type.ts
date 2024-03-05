export type CustomEventType = "addRestaurant";

export interface EventHandler {
  target: HTMLElement | Document;
  eventName: CustomEventType | keyof HTMLElementEventMap;
  eventHandler: EventListener;
}
