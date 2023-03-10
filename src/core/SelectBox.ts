type Attributes = {
  name: string;
  id: string;
  classList: string[];
};

type Options = Option[];

type Option = {
  value: string;
  text: string;
};

export default class SelectBox {
  #attributes;
  #options;

  constructor(attributes: Attributes, options: Options) {
    this.#attributes = attributes;
    this.#options = options;
  }

  render(targetElement: Element) {
    targetElement.insertAdjacentHTML('beforeend', this.#getTemplate());
  }

  #getTemplate() {
    const { name, id, classList } = this.#attributes;

    return `
    <select name="${name}" id="${id}" class="${classList.join(' ')}">
      ${this.#options.reduce((template, option) => {
        const { value, text } = option;

        return template + `<option value="${value}">${text}</option>`;
      }, '')}      
    </select>
    `;
  }
}
