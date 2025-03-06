import CATEGORY from '../constant/category';
import { convertStringToElement } from '../utils/convertStringToElement';
const INPUT_DROPDOWN_TEMPLATE = (tag, title) => {
  return `
    <label for=${tag} class="text-caption">${title}</label>
    <select name=${tag} id="${tag}" class="select-input" required>
      <option value="">선택해주세요</option>
    </select>
  `;
};

const OPTION_TEMPLATE = (value, innerValue) => {
  return `<option value="${innerValue}">${value}</option>`;
};

class InputDropDown {
  constructor(title, List) {
    return this.#createInputDropDown(title, List);
  }

  #createInputDropDown = (title, optionList) => {
    const inputDropDown = document.createElement('div');
    inputDropDown.classList.add('form-item');
    inputDropDown.classList.add('form-item--required');
    const tag = title === '카테고리' ? 'category' : 'distance';
    inputDropDown.innerHTML = INPUT_DROPDOWN_TEMPLATE(tag, title);

    const select = inputDropDown.querySelector('select');

    optionList.forEach(([value, innerValue]) => {
      const optionHTML = this.#addTemplate(value, innerValue);
      select.insertAdjacentHTML('beforeend', optionHTML);
    });

    return inputDropDown;
  };

  #addTemplate = (value, innerValue) => {
    return OPTION_TEMPLATE(value, innerValue);
  };
}

export default InputDropDown;
