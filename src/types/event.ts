import { MENU_APP_EVENTS } from "../constants/event";

export type MenuAppEvent = (typeof MENU_APP_EVENTS)[keyof typeof MENU_APP_EVENTS];

export type TotalMenuAppEvent = keyof HTMLElementEventMap | MenuAppEvent;
