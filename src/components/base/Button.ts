interface Props {
  content: string;
  addClassList?: string[];
  onClick?: () => void;
}

class Button {
  #buttonElement = document.createElement('button');

  #onClick?: () => void;

  constructor({ content, addClassList, onClick }: Props) {
    this.#onClick = onClick;
    this.#buttonElement.setAttribute('type', 'button');
    this.#buttonElement.classList.add('button', 'text-caption');
    this.#buttonElement.innerHTML = content;

    if (addClassList) {
      this.#addClasses(addClassList);
    }
    this.#addEvent();
  }

  #addClasses(addClassList: string[]) {
    if (addClassList) {
      this.#buttonElement.classList.add(...addClassList);
    }
  }

  #addEvent() {
    this.#buttonElement.addEventListener('click', () => {
      if (this.#onClick) this.#onClick();
    });
  }

  get element() {
    return this.#buttonElement;
  }
}

export default Button;
