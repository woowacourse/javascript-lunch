import { Attributes } from '../../types';
import { setObjectAttribute } from '../../utils';
import FormTextField from '../FormTextField';

class FromInput extends FormTextField {
  constructor() {
    super();
  }

  connectedCallback() {
    const attributes: Attributes = {
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

  #setCustomInput(attributes: Attributes) {
    const customInputEl = setObjectAttribute(
      attributes,
      document.createElement('custom-input'),
    );
    const customTextContainerEl = this.querySelector('.custom-text-container');

    customTextContainerEl?.appendChild(customInputEl);
  }
}

customElements.define('form-input', FromInput);
