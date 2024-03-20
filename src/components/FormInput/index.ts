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
      id: this.getAttribute('label-for-id'),
      name: this.getAttribute('label-for-id'),
      required: this.getAttribute('required'),
      maxLength: this.getAttribute('max-length'),
      placeholder: this.getAttribute('placeholder'),
    };

    super.connectedCallback();
    this.#setCustomInput(attributes);
    super.handleAddEvent();
  }

  #setCustomInput(attributes: Attributes) {
    const $customInput = setObjectAttribute(
      attributes,
      document.createElement('custom-input'),
    );
    const $customTextContainer = this.querySelector('.custom-text-container');

    $customTextContainer?.appendChild($customInput);
  }
}

customElements.define('form-input', FromInput);
