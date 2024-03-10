import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { ObjectToUnion } from "../../types/common";

export type CustomEventType = ObjectToUnion<typeof CUSTOM_EVENT_TYPE>;

export interface CustomEventListener {
  target: HTMLElement | Document;
  eventName: CustomEventType | keyof HTMLElementEventMap;
  eventHandler: (event: Event) => void;
}
