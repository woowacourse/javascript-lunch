type FormSelectType = {
  parentElement: HTMLElement;
  info: {
    id: string;
    name: string;
    title: string;
    choices: { value: string; displayName: string }[];
  };
};

class FormSelect {
  #parentElement;
  #info;

  constructor({ parentElement, info }: FormSelectType) {
    this.#parentElement = parentElement;
    this.#info = info;
    this.#render();
  }

  #render() {
    const element = `
      <div class="form-item form-item--required">
        <label for="${this.#info.id}">${this.#info.title}</label>
        <select name="${this.#info.name}" id="${this.#info.id}" required>
          <option>선택해 주세요</option>
          ${this.#info.choices
            .map(
              (choice) =>
                `<option value="${choice.value}">${choice.displayName}</option>`
            )
            .join('')}
        </select>
      </div>`;

    if (this.#parentElement) {
      this.#parentElement.insertAdjacentHTML(
        'beforeEnd' as InsertPosition,
        element
      );
    }
  }
}

export default FormSelect;
