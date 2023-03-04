type FormInputType = {
  parentElement: HTMLElement;
  info: {
    id: string;
    name: string;
    title: string;
    isRequired: boolean;
    hasDescription: boolean;
    description?: string;
  };
};

class FormInput {
  #parentElement;
  #info;

  constructor({ parentElement, info }: FormInputType) {
    this.#parentElement = parentElement;
    this.#info = info;
    this.#render();
  }

  #render() {
    const element = `
      <div class="form-item ${
        this.#info.isRequired ? 'form-item--required' : ''
      }">
        <label for="${this.#info.id}">${this.#info.title}</label>
        <input type="text" name="${this.#info.name}" id="${this.#info.id}" ${
      this.#info.isRequired ? 'required' : ''
    }>
        ${
          this.#info.hasDescription
            ? `<span class="help-text text-caption">${
                this.#info.description
              }</span>`
            : ''
        }
      </div>`;

    if (this.#parentElement) {
      this.#parentElement.insertAdjacentHTML(
        'beforeEnd' as InsertPosition,
        element
      );
    }
  }
}

export default FormInput;
