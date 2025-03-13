class Button {
  #button;

  constructor(type, className, buttonText, onClick) {
    this.#button = this.#createButton(type, className, buttonText);
    this.#bindEvent(onClick);
    return this.#button;
  }

  #createButton(type, className, buttonText) {
    const button = document.createElement('button');
    button.type = type;
    button.classList.add('button', className);
    button.textContent = buttonText;
    return button;
  }

  #bindEvent(onClick) {
    this.#button.addEventListener('click', onClick);
  }
}

export default Button;
