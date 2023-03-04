type FormTextAreaType = {
  parentElement: HTMLElement;
  info: {
    id: string;
    name: string;
    title: string;
    isRequired: boolean;
    hasDescription: boolean;
    description?: string;
    cols?: number;
    rows?: number;
  };
};

const DEFAULT_LENGTH = Object.freeze({
  cols: 30,
  rows: 1,
});

class FormTextArea {
  #parentElement;
  #info;

  constructor({ parentElement, info }: FormTextAreaType) {
    this.#parentElement = parentElement;
    this.#info = info;
    this.#render();
  }

  #render() {
    const element = `
      <div class="form-item">
        <label for="${this.#info.id}">${this.#info.title}</label>
        <textarea
          name="${this.#info.name}"
          id="${this.#info.id}"
          cols="${this.#info.cols || DEFAULT_LENGTH.cols}"
          rows="${this.#info.rows || DEFAULT_LENGTH.rows}"
        ></textarea>
        <span class="help-text text-caption"
        >${this.#info.description}</span
      ></div>`;

    if (this.#parentElement) {
      this.#parentElement.insertAdjacentHTML(
        'beforeEnd' as InsertPosition,
        element
      );
    }
  }
}

export default FormTextArea;
