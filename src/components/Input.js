class Input {
  #inputContainer;
  #inputComponent;

  constructor({ name, title, required = false, spanText = '', inputComponent }) {
    this.#inputComponent = inputComponent;
    this.#inputContainer = this.#createInput(name, title, required, spanText, inputComponent);
  }

  #createInput(name, title, required, spanText, inputComponent) {
    const formItem = document.createElement('div');
    formItem.classList.add('form-item');
    if (required) formItem.classList.add('form-item--required');

    const label = this.#createFormItemLabel(name, title);
    formItem.appendChild(label);
    formItem.appendChild(inputComponent.getElement());

    if (spanText) {
      const span = document.createElement('span');
      span.classList.add('help-text', 'text-caption');
      span.textContent = spanText;
      formItem.appendChild(span);
    }

    return formItem;
  }

  #createFormItemLabel = (type, title) => {
    const label = document.createElement('label');
    label.setAttribute('for', type);
    label.classList.add('text-caption');
    label.textContent = title;

    return label;
  };

  reset() {
    this.#inputComponent.reset();
  }

  getElement() {
    return this.#inputContainer;
  }
}

export default Input;
