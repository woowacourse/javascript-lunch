import type { IButtonAttributes } from '../types/dom';
import dom from '../utils/dom';

interface IButtonProps {
  $target: HTMLElement;
  attributes: IButtonAttributes;
  eventHandler: () => void;
}

class Button {
  $target;
  attributes;
  eventHandler;

  constructor({ $target, attributes, eventHandler }: IButtonProps) {
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
    const { name, id, classNames, type, text } = this.attributes;
    const buttonTag = dom.createButtonTag({ name, id, classNames, type, text });
    this.$target.appendChild(buttonTag);
  }
}

export default Button;
