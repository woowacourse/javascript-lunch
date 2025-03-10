class Button {
  constructor(className, buttonText) {
    return this.#createButton(className, buttonText);
  }

  #createButton = (className, buttonText) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('button', className);
    button.textContent = buttonText;
    return button;
  };
}

export default Button;
