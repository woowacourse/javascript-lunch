import CATEGORY from '../constant/category.js';
import { convertStringToElement } from '../utils/convertStringToElement.js';

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
  constructor(title, option) {
    return this.#createInputDropDown(title, option);
  }

  #createInputDropDown = (title, option) => {
    const inputDropDown = document.createElement('div');
    inputDropDown.classList.add('form-item');
    inputDropDown.classList.add('form-item--required');
    const tag = title === '카테고리' ? 'category' : 'distance';
    inputDropDown.innerHTML = INPUT_DROPDOWN_TEMPLATE(tag, title);

    const select = inputDropDown.querySelector('select');

    Object.entries(option).forEach(([key, value]) => {
      const optionHTML = this.#addTemplate(value, key);
      select.insertAdjacentHTML('beforeend', optionHTML);
    });

    return inputDropDown;
  };

  #addTemplate = (value, innerValue) => {
    return OPTION_TEMPLATE(value, innerValue);
  };
}

export default InputDropDown;
