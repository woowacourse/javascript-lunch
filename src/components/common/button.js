const $button = (buttonInfo) => {
  const button = document.createElement("button");

  Object.assign(button, buttonInfo.attribute);
  button.textContent = buttonInfo.text;
  if (buttonInfo.event && buttonInfo.eventType) {
    button.addEventListener(buttonInfo.eventType, buttonInfo.event);
  }

  return button;
};

export default $button;
