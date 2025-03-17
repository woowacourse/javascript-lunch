import { UI_CONFIG } from "../../constants/uiConfig";
import { EventType } from "../../types/types";

type UiConfigButton = (typeof UI_CONFIG)["BUTTONS"];
type UiConfigButtonKey = keyof UiConfigButton;

const $button = (
  buttonInfo: UiConfigButton[UiConfigButtonKey],
  buttonEvent?: EventType
) => {
  const { attribute, text } = buttonInfo;
  const { eventType, eventHandler } = buttonEvent ?? {};

  const button = document.createElement("button");

  Object.assign(button, attribute);
  button.textContent = text;

  if (eventType && eventHandler) {
    button.addEventListener(eventType, eventHandler);
  }

  return button;
};

export default $button;
