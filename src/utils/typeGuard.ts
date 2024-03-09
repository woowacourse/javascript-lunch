import { CUSTOM_EVENT_TYPE } from "../constants/eventType";
import { RestaurantDetail } from "../domain/Restaurant/Restaurant.type";

export const isCustomEventType = (
  eventType: string
): eventType is keyof typeof CUSTOM_EVENT_TYPE => {
  return eventType in CUSTOM_EVENT_TYPE;
};

export const isUserInputValues = (
  userInputValues: object
): userInputValues is RestaurantDetail => {
  return Object.keys(userInputValues).every((key) => {
    ["category", "name", "distance"].includes(key);
  });
};
