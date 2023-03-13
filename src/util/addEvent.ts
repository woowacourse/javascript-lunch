import { EventHandler, EventType } from "../types/restaurant";

export const addEvent = (selector: Element, eventType: EventType, callback: EventHandler): void => {
  selector.addEventListener(eventType, (e: Event) => callback(e), true);
};
