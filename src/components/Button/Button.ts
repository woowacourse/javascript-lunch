import customCreateElement from '../../utils/customCreateElement';

interface Props {
  content: string;
  addClassList?: string[];
  onClick?: () => void;
}

class Button {
  #buttonElement;

  #onClick?: () => void;

  constructor({ content, addClassList, onClick }: Props) {
    this.#onClick = onClick;
    this.#buttonElement = customCreateElement({
      elementType: 'button',
      classList: ['button', 'text-caption'],
      attribute: { type: 'button' },
      content,
    });
    if (addClassList) this.#addClasses(addClassList);
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
