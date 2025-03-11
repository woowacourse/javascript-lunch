class Button {
  #button;

  constructor(className, buttonText) {
    this.#button = this.#createButton(className, buttonText);
    return this.#button;
  }

  #createButton = (className, buttonText) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('button', className);
    button.textContent = buttonText;
    return button;
  };

  addEventListener = (type, listener) => {
    this.#button.addEventListener(type, listener);
  };
}

export default Button;
