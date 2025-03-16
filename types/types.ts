import {
  BUTTON_TYPES,
  EVENT_TYPES,
  LABEL_KEYS,
  NAV_BAR_KEYS,
} from "../src/constants/constants.js";

export type Category =
  | "전체"
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";
export type Uuid = string & { readonly _brand: unique symbol };
export type Distance = "5" | "10" | "15" | "20" | "30";
export type UrlString = `http://${string}` | `https://${string}`;

export type LabelKey = (typeof LABEL_KEYS)[keyof typeof LABEL_KEYS];
export type NavBarKey = (typeof NAV_BAR_KEYS)[keyof typeof NAV_BAR_KEYS];
export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
export type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
