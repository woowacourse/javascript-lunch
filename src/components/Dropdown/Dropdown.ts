class Dropdown {
  #dropdownElement = document.createElement('select');

  constructor(id: string, name: string, options?: string[]) {
    if (id) this.#dropdownElement.id = id;
    if (name) this.#dropdownElement.name = name;

    if (options) {
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
