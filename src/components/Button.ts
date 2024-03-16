interface Props {
  content: string;
  onClick?: () => void;
}

class Button {
  #buttonElement = document.createElement('button');

  #onClick?: () => void;

  constructor({ content, onClick }: Props) {
    this.#onClick = onClick;
    this.#buttonElement.setAttribute('type', 'button');
    this.#buttonElement.classList.add('button', 'button--secondary', 'text-caption');

    this.#buttonElement.innerText = content;

    this.#buttonElement.addEventListener('click', () => {
      if (this.#onClick) this.#onClick();
    });
  }

  get element() {
    return this.#buttonElement;
  }
}

export default Button;
