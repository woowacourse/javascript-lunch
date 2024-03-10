import type { ISelectAttributes, ISelectOption } from '../types/selectBox';

interface ISelectBox {
  $target: HTMLElement;
  attributes: ISelectAttributes;
  eventHandler: () => void;
  options: ISelectOption[];
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
      const optionTag = this.#getOptionTag(option);
      selectTag.appendChild(optionTag);
    });
    this.$target.appendChild(selectTag);
  }

  #getSelectTag(): HTMLSelectElement {
    const { name, id, class: classNames, required } = this.attributes;
    const selectTag = document.createElement('select');
    selectTag.name = name ?? '';
    selectTag.id = id ?? '';
    if (classNames != null) {
      classNames.forEach(className => {
        selectTag.classList.add(className);
      });
    }
    selectTag.required = required ?? false;
    return selectTag;
  }

  #getOptionTag(selectOption: ISelectOption): HTMLOptionElement {
    const optionTag = document.createElement('option');
    optionTag.value = selectOption.value;
    optionTag.textContent = selectOption.text;
    return optionTag;
  }
}

export default SelectBoxComponent;
