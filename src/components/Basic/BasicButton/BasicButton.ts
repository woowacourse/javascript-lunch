import BaseComponent from '../../BaseComponent';
import './BasicButton.css';
class BasicButton extends BaseComponent {
  #isPrimary;
  #innerText;
  #type;
  #clickEvent;

  constructor(
    isPrimary: boolean,
    innerText: string,
    type: 'submit' | 'reset' | 'button',
    clickEvent: () => void,
  ) {
    super();
    this.#isPrimary = isPrimary;
    this.#innerText = innerText;
    this.#type = type;
    this.#clickEvent = clickEvent;
  }

  render() {
    const $button = this.#getButton();
    this.append($button);
    this.className = 'button';
    
    this.addEventListener('click', () => {
      this.#clickEvent();
    });
  }

  #getButton() {
    const $button = document.createElement('button');
    const buttonStyleClass = `${this.#isPrimary ? 'button--primary' : 'button--secondary'}`;
    $button.classList.add('button', 'text-caption', buttonStyleClass);
    $button.setAttribute('type', this.#type);
    $button.innerText = this.#innerText;

    return $button;
  }
}

customElements.define('basic-button', BasicButton);

export default BasicButton;
