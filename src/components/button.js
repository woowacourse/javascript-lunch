const $button = (buttonInfo) => {
  const button = document.createElement("button");
  button.textContent = buttonInfo.text;
  button.type = buttonInfo.type;
  button.classList.add(...(buttonInfo?.className || []));

  if (buttonInfo.event && buttonInfo.eventType) {
    button.addEventListener(buttonInfo.eventType, buttonInfo.event);
  }

  return button;
};

export default $button;
