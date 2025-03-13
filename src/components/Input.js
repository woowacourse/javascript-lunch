import { createFormItemLabel } from './createFormItemLabel.js';

class Input {
  #inputContainer;

  constructor({ name, title, spanText = '', inputComponent }) {
    this.#inputContainer = this.#createInput(name, title, spanText, inputComponent);
  }

  #createInput(name, title, spanText, inputComponent) {
    const formItem = document.createElement('div');
    formItem.classList.add('form-item');

    const label = createFormItemLabel(name, title);
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

  getElement() {
    return this.#inputContainer;
  }
}

export default Input;
