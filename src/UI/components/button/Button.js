import './Button.css';

class Button {
  #button;

  constructor(type, className, buttonText, listener) {
    this.#button = this.#createButton(type, className, buttonText);
    this.#bindEvent(listener);
    return this.#button;
  }

  #createButton = (type, className, buttonText) => {
    const button = document.createElement('button');
    button.type = type;
    button.classList.add('button', className);
    button.textContent = buttonText;
    return button;
  };

  #bindEvent = (listener) => {
    this.#button.addEventListener('click', listener);
  };
}

export default Button;
