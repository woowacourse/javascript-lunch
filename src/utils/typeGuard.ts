import { CUSTOM_EVENT_TYPE } from "../constants/eventType";

export const isCustomEventType = (
  eventType: string
): eventType is keyof typeof CUSTOM_EVENT_TYPE => {
  return eventType in CUSTOM_EVENT_TYPE;
};
