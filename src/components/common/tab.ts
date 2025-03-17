import { UI_CONFIG } from "../../constants/uiConfig";
import { EventType } from "../../types/types";

type UiConfigTab = (typeof UI_CONFIG)["TABS"];
type UiConfigTabKey = keyof UiConfigTab;

const $tab = (tabInfo: UiConfigTab[UiConfigTabKey], tabEvent?: EventType) => {
  const { attribute, text } = tabInfo;
  const { eventType, eventHandler } = tabEvent ?? {};

  const tab = document.createElement("button");

  Object.assign(tab, attribute);
  tab.textContent = text;

  if (eventType && eventHandler) {
    tab.addEventListener(eventType, eventHandler);
  }

  return tab;
};

export default $tab;
