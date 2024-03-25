import Dropdown from './Dropdown';

interface Props {
  id?: string;
  classList?: string[];
  attribute?: object;
  options?: string[];
}
class FormDropdown extends Dropdown {
  #dropdownElement = this.element;

  constructor({ id, classList, attribute, options }: Props) {
    super({ id, classList, attribute, options });

    this.#addDefaultOption();
  }

  #addDefaultOption() {
    const optionElement = document.createElement('option');
    optionElement.value = '';
    optionElement.textContent = '선택해 주세요';
    optionElement.selected = true;

    this.#dropdownElement.prepend(optionElement);
  }
}

export default FormDropdown;
