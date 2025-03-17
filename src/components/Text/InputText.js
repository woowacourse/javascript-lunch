class InputText {
  #input;

  constructor({ name, required = false }) {
    this.#input = document.createElement('input');
    this.#input.setAttribute('type', 'text');
    this.#input.setAttribute('name', name);
    this.#input.setAttribute('id', name);
    if (required) this.#input.required = true;
  }

  reset() {
    this.#input.value = '';
  }

  getElement() {
    return this.#input;
  }
}

export default InputText;
