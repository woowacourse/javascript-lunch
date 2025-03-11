class Button {
  #button;

  constructor(type, className, buttonText) {
    this.#button = this.#createButton(type, className, buttonText);
    return this.#button;
  }

  #createButton = (type, className, buttonText) => {
    const button = document.createElement('button');
    button.type = type;
    button.classList.add('button', className);
    button.textContent = buttonText;
    return button;
  };

  addEventListener = (type, listener) => {
    this.#button.addEventListener(type, listener);
  };
}

export default Button;
