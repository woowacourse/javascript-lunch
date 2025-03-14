import CATEGORY from '../../constant/category';

type DropDownTitle = '카테고리' | '거리(도보 이동 시간)';

const TAG_MAP: Record<DropDownTitle, string> = {
  카테고리: 'category',
  '거리(도보 이동 시간)': 'distance',
};

class InputDropDown {
  private element: HTMLDivElement;

  constructor(title: DropDownTitle, List: string[][]) {
    this.element = this.#createInputDropDown(title, List);
  }

  #createOption(value: string, textContent: string): HTMLOptionElement {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = textContent;
    return option;
  }

  #createInputDropDown(title: DropDownTitle, optionList: string[][]): HTMLDivElement {
    const inputDropDown = document.createElement('div');
    inputDropDown.classList.add('form-item');
    inputDropDown.classList.add('form-item--required');

    const tag = TAG_MAP[title];
    const label = document.createElement('label');
    label.setAttribute('for', tag);
    label.classList.add('text-caption');
    label.textContent = title;

    const select = document.createElement('select');
    select.name = tag;
    select.id = tag;
    select.classList.add('select-input');
    select.required = true;

    const defaultOption = this.#createOption('', '선택해주세요');
    select.appendChild(defaultOption);

    optionList.forEach(([value, textContent]) => {
      const option = this.#createOption(value, textContent);
      select.appendChild(option);
    });

    inputDropDown.appendChild(label);
    inputDropDown.appendChild(select);

    return inputDropDown;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default InputDropDown;
