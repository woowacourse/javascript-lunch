import { EventType } from "../../types/types";
import { TabConfig } from "../../types/uiConfigType";

const $tab = (tabInfo: TabConfig, tabEvent?: EventType) => {
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
