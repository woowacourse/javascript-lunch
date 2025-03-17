const OPTION_TEMPLATE = (value, innerValue) => {
  return `<option value="${innerValue}">${value}</option>`;
};

class InputDropDown {
  #select;
  #option;

  constructor({ name, id, required = false, option, optionDefault }) {
    this.#option = option;
    this.#select = this.#createInputDropDown(name, id, required, optionDefault);
  }

  #createInputDropDown(name, id, required, optionDefault) {
    const select = document.createElement('select');
    select.setAttribute('name', name);
    select.setAttribute('id', id);
    if (required) select.required = true;

    if (optionDefault != null) select.insertAdjacentHTML('beforeend', OPTION_TEMPLATE(optionDefault, ''));

    Object.entries(this.#option).forEach(([key, value]) => {
      select.insertAdjacentHTML('beforeend', OPTION_TEMPLATE(value, key));
    });

    return select;
  }

  reset() {
    this.#select.selectedIndex = 0;
  }

  getElement() {
    return this.#select;
  }
}

export default InputDropDown;
