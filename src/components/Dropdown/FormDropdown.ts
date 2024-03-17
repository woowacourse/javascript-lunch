import Dropdown from './Dropdown';

class FormDropdown extends Dropdown {
  #dropdownElement = this.element;

  constructor(id: string, name: string, options: string[]) {
    super(id, name);

    this.#addDefaultOption();
    options.forEach((option) => {
      this.#generateOptionElement(option, option);
    });
  }

  #addDefaultOption() {
    const optionElement = document.createElement('option');
    optionElement.value = '';
    optionElement.textContent = '선택해 주세요';

    this.#dropdownElement.appendChild(optionElement);
  }

  #generateOptionElement(option: string, value: string) {
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;

    this.#dropdownElement.appendChild(optionElement);
  }
}

export default FormDropdown;
