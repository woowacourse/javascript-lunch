import type { IDomAttributes, ISelectOption } from '../types/selectBox';

interface ISelectBox {
  $target: HTMLElement;
  attributes: IDomAttributes;
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
    const { name, id, class: className, required } = this.attributes;
    const selectTag = document.createElement('select');
    selectTag.name = name ?? '';
    selectTag.id = id ?? '';
    if (className != null) selectTag.classList.add(className);
    selectTag.required = required ?? false;

    this.options.forEach(option => {
      const optionTag = this.#getOptionTag(option);
      selectTag.appendChild(optionTag);
    });
    this.$target.appendChild(selectTag);
  }

  #getOptionTag(selectOption: ISelectOption): HTMLOptionElement {
    const optionTag = document.createElement('option');
    optionTag.value = selectOption.value;
    optionTag.textContent = selectOption.text;
    return optionTag;
  }
}

export default SelectBoxComponent;
