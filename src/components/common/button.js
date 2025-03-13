const $button = ({ attribute, text, eventType, event }) => {
  const button = document.createElement("button");

  Object.assign(button, attribute);
  button.textContent = text;

  if (eventType && event) {
    button.addEventListener(eventType, event);
  }

  return button;
};

export default $button;
