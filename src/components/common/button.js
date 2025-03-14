const $button = (buttonInfo, buttonEvent = {}) => {
  const { attribute, text } = buttonInfo;
  const { eventType, eventHandler } = buttonEvent;

  const button = document.createElement("button");

  Object.assign(button, attribute);
  button.textContent = text;

  if (eventType && eventHandler) {
    button.addEventListener(eventType, eventHandler);
  }

  return button;
};

export default $button;
