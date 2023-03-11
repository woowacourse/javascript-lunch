import { EventHandler, EventType } from "../types/restaurant";

export const addEvent = ($target: Element, eventType: EventType, selector: string, callback: EventHandler): void => {
  $target.addEventListener(eventType, (event: Event) => {
    if (!(event.target as Element).closest(selector)) return false;
    callback(event);
  });
};
