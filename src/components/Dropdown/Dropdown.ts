class Dropdown {
  #dropdownElement = document.createElement('select');

  constructor(id: string, name: string, options?: string[]) {
    if (id && name && options) {
      this.#dropdownElement.id = id;
      this.#dropdownElement.name = name;

      options.forEach((option) => {
        this.#generateOptionElement(option, option);
      });
    }
  }

  #generateOptionElement(option: string, value: string) {
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;

    this.#dropdownElement.appendChild(optionElement);
  }

  get element() {
    return this.#dropdownElement;
  }
}

export default Dropdown;
