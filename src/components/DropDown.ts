import type { Component } from '../interface';
import { Category, SortBy, SelectOption } from '../type';

type DropDownState = {
  options: SelectOption[];
  selectedOption: Category | SortBy;
  onChangeHandler: (e: Event) => void;
};

type DropDownProps = {
  $parent: HTMLElement;
  name?: string;
  id?: string;
  classNames?: string;
  options: SelectOption[];
  selectedOption: Category | SortBy;
  onChangeHandler: (e: Event) => void;
};

class DropDown implements Component<DropDownState> {
  $target: HTMLSelectElement;
  state: DropDownState;

  constructor({
    $parent,
    name,
    id,
    classNames,
    options,
    selectedOption,
    onChangeHandler,
  }: DropDownProps) {
    this.$target = document.createElement('select');
    this.$target.classList.add(classNames ?? '');
    this.$target.id = id ?? '';
    this.$target.name = name ?? '';
    this.state = {
      options,
      selectedOption,
      onChangeHandler,
    };
    $parent.append(this.$target);
    this.addEvent();
  }

  setState(newState: DropDownState) {
    this.state = newState;
    this.render();
  }

  setSelectAttribute(selectedOption: string, target: string) {
    return selectedOption === target ? 'selected' : '';
  }

  addEvent() {
    this.$target?.addEventListener('change', this.state.onChangeHandler);
  }

  render() {
    this.$target.innerHTML = `
        ${this.state.options
          .map(
            (option) =>
              `<option value="${option.value}" ${this.setSelectAttribute(
                this.state.selectedOption,
                option.value
              )}>${option.textContent}</option>`
          )
          .join('')}
        `;
  }
}

export default DropDown;
