import type { IDomAttributes } from '../types/selectBox';

interface IButton {
  $target: HTMLElement;
  attributes: IDomAttributes;
  eventHandler: () => void;
}

class Button {
  $target;
  attributes;
  eventHandler;

  constructor({ $target, attributes, eventHandler }: IButton) {
    this.$target = $target;
    this.attributes = attributes;
    this.eventHandler = eventHandler;
    this.render();
    this.setEvent();
  }

  setEvent(): void {
    this.$target.addEventListener('click', this.eventHandler);
  }

  render(): void {
    const buttonTag = this.#getButtonTag();
    this.$target.appendChild(buttonTag);
  }

  #getButtonTag(): HTMLButtonElement {
    const buttonTag = document.createElement('button');
    const { name, id, class: classNames, type, text } = this.attributes;
    buttonTag.name = name ?? '';
    buttonTag.id = id ?? '';
    if (classNames != null) {
      classNames.forEach(className => {
        buttonTag.classList.add(className);
      });
    }
    buttonTag.type = type ?? 'submit';
    buttonTag.textContent = text ?? '';
    return buttonTag;
  }
}

export default Button;
