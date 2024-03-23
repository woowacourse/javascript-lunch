interface Props {
  id?: string;
  classList?: string[];
  attribute?: object;
  options?: string[];
}

class Dropdown {
  #dropdownElement = document.createElement('select');

  constructor({ id, classList, attribute, options }: Props) {
    if (id) this.#dropdownElement.id = id;
    if (classList) this.#dropdownElement.classList.add(...classList);
    if (attribute) {
      this.#generateAttributes(attribute);
    }
    if (options) {
      this.#generateOptionElements(options);
    }
  }

  #generateAttributes(attribute: object) {
    Object.entries(attribute).forEach(([key, value]) => {
      this.#dropdownElement.setAttribute(key, value);
    });
  }

  #generateOptionElements(options: string[]) {
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;

      this.#dropdownElement.appendChild(optionElement);
    });
  }

  get element() {
    return this.#dropdownElement;
  }
}

export default Dropdown;
