class InputTextArea {
  #textarea;

  constructor({ name, required = false, cols = 30, rows = 5 }) {
    this.#textarea = document.createElement('textarea');
    this.#textarea.setAttribute('name', name);
    this.#textarea.setAttribute('id', name);
    this.#textarea.setAttribute('cols', cols);
    this.#textarea.setAttribute('rows', rows);
    if (required) this.#textarea.required = true;
  }

  reset() {
    this.#textarea.value = '';
  }

  getElement() {
    return this.#textarea;
  }
}

export default InputTextArea;
