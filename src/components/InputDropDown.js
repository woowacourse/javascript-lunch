import CATEGORY from '../constant/category';
import { convertStringToElement } from '../utils/convertStringToElement';
const INPUT_DROPDOWN_TEMPLATE = (title) => {
  return `
    <label for="category" class="text-caption">${title}</label>
    <select name="category" id="category" class="select-input" required>
      <option value="">선택해 주세요</option>
    </select>
  `;
};

const OPTION_CATEGORY = (category) => {
  return `<option value="${category}">${category}</option>`;
};

class InputDropDown {
  constructor(title, categoryList) {
    return this.#createInputDropDown(title, categoryList);
  }

  #createInputDropDown = (title, categoryList) => {
    const inputDropDown = document.createElement('div');
    inputDropDown.classList.add('form-item');
    inputDropDown.classList.add('form-item--required');
    inputDropDown.innerHTML = INPUT_DROPDOWN_TEMPLATE(title);

    const select = inputDropDown.querySelector('select');

    categoryList.forEach((category) => {
      const optionHTML = this.#addCategory(category);
      select.insertAdjacentHTML('beforeend', optionHTML);
    });

    return inputDropDown;
  };

  #addCategory = (category) => {
    return OPTION_CATEGORY(category);
  };
}

export default InputDropDown;
