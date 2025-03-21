import './Button.css';

type ButtonType = 'button' | 'submit' | 'reset';

class Button {
  #button: HTMLButtonElement;

  constructor(type: ButtonType, className: string, buttonText: string, onClick: (event: MouseEvent) => void) {
    this.#button = this.#createButton(type, className, buttonText);
    this.#bindEvent(onClick);
  }

  #createButton(type: ButtonType, className: string, buttonText: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = type;
    button.classList.add('button', className);
    button.textContent = buttonText;
    return button;
  }

  #bindEvent(onClick: (event: MouseEvent) => void): void {
    this.#button.addEventListener('click', onClick);
  }

  getElement(): HTMLButtonElement {
    return this.#button;
  }
}

export default Button;
