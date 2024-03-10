import type { ISelectAttributes, IOptionAttributes } from '../types/dom';
import dom from '../utils/dom';

interface ISelectBox {
  $target: HTMLElement;
  attributes: ISelectAttributes;
  eventHandler: () => void;
  options: IOptionAttributes[];
}

class SelectBoxComponent {
  $target;
  attributes;
  eventHandler;
  options;

  constructor({ $target, attributes, eventHandler, options }: ISelectBox) {
    this.$target = $target;
    this.attributes = attributes;
    this.eventHandler = eventHandler;
    this.options = options;
    this.render();
    this.setEvent();
  }

  setEvent(): void {
    this.$target.addEventListener('change', this.eventHandler);
  }

  render(): void {
    const selectTag = this.#getSelectTag();
    this.options.forEach(option => {
      const optionTag = dom.createOptionTag({ value: option.value, text: option.text });
      selectTag.appendChild(optionTag);
    });
    this.$target.appendChild(selectTag);
  }

  #getSelectTag(): HTMLSelectElement {
    const { name, id, classNames, required } = this.attributes;
    return dom.createSelectTag({ name, id, classNames, required });
  }
}

export default SelectBoxComponent;
