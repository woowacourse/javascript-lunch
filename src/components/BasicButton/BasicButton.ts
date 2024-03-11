import BaseComponent from '../BaseComponent';

type ButtonProps = {
  variant: 'primary' | 'secondary';
  textContent: string;
  type: 'submit' | 'reset' | 'button';
  clickEvent: () => void;
};

class BasicButton extends BaseComponent {
  #variant;
  #textContent;
  #type;
  #clickEvent;

  constructor({ variant, textContent, type, clickEvent }: ButtonProps) {
    super();
    this.#variant = variant;
    this.#textContent = textContent;
    this.#type = type;
    this.#clickEvent = clickEvent;
  }

  render() {
    const $button = this.#addButton();
    this.outerHTML = $button.outerHTML;
  }

  setEvent(): void {
    this.addEventListener('click', () => {
      this.#clickEvent();
    });
  }

  #addButton() {
    const $button = document.createElement('button');
    const buttonStyleClass = `${
      this.#variant === 'primary' ? 'button--primary' : 'button--secondary'
    }`;
    $button.classList.add('button', 'text-caption', buttonStyleClass);
    $button.setAttribute('type', this.#type);
    $button.textContent = this.#textContent;

    return $button;
  }
}

customElements.define('basic-button', BasicButton);

export default BasicButton;
