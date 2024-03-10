import FormTextField from '../FormTextField';

class FromInput extends FormTextField {
  constructor() {
    super();
  }

  connectedCallback() {
    const attributes = {
      type: this.getAttribute('type'),
      id: this.getAttribute('labelForId'),
      name: this.getAttribute('labelForId'),
      required: this.getAttribute('required'),
      maxlength: this.getAttribute('maxlength'),
      placeholder: this.getAttribute('placeholder'),
    };
    super.connectedCallback();
    this.#setCustomInput(attributes);
    super.handleAddEvent();
  }

  #setCustomInput(attributes: Object) {
    const customInputEl = document.createElement('custom-input');

    Object.entries(attributes).forEach(([key, value]) => {
      customInputEl.setAttribute(key, value);
    });

    const customTextContainerEl = this.querySelector('.custom-text-container');

    customTextContainerEl?.appendChild(customInputEl);
  }
}

customElements.define('form-input', FromInput);
