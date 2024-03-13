import style from './BasicButton.module.css';
class BasicButton extends HTMLButtonElement {
  #isPrimary;

  constructor(
    styleVariant: 'primary' | 'secondary',
    innerText: string,
    type: 'submit' | 'reset' | 'button',
    clickEvent: () => void,
  ) {
    super();
    this.#isPrimary = styleVariant;
    this.innerText = innerText;
    this.setAttribute('type', type);

    const buttonStyleClass =
      this.#isPrimary === 'primary'
        ? ['button--primary', `${style.buttonPrimary}`]
        : ['button--secondary', `${style.buttonSecondary}`];

    this.classList.add('button', `${style.button}`, 'text-caption');
    this.classList.add(...buttonStyleClass);

    this.addEventListener('click', () => {
      clickEvent();
    });
  }

  render() {}
}

customElements.define('basic-button', BasicButton, { extends: 'button' });

export default BasicButton;
