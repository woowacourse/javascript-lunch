import CATEGORY from '../../constant/category.js';
import './Input.css';

const TAG_MAP = {
  '카테고리': 'category',
  '거리(도보 이동 시간)': 'distance'
};

class InputDropDown {
  constructor(title, List) {
    return this.#createInputDropDown(title, List);
  }

  #createOption = (value, textContent) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = textContent;
    return option;
  };

  #createInputDropDown = (title, optionList) => {
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
  };
}

export default InputDropDown;
