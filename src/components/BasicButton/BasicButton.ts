import BaseComponent from '../BaseComponent';

class BasicButton extends BaseComponent {
  #isPrimary;
  #innerText;

  constructor(isPrimary: boolean, innerText: string) {
    super();
    this.#isPrimary = isPrimary;
    this.#innerText = innerText;
  }

  render() {
    const $button = this.#getButton();
    this.outerHTML = $button.outerHTML;
  }

  #getButton() {
    const $button = document.createElement('button');
    const buttonStyleClass = `${this.#isPrimary ? 'button--primary' : 'button--secondary'}`;
    $button.classList.add('button', 'text-caption', buttonStyleClass);
    $button.innerText = this.#innerText;

    return $button;
  }
}

customElements.define('basic-button', BasicButton);

export default BasicButton;
