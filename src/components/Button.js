const BUTTON_TEMPLATE = (className, buttonText) => {
  return `<button type="button" class="button ${className} text-caption">${buttonText}</button>`;
};

class Button {
  constructor(className, buttonText) {
    return this.#crerateButton(className, buttonText);
  }

  #crerateButton = (className, buttonText) => {
    return BUTTON_TEMPLATE(className, buttonText);
  };
}
