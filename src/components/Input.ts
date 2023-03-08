import { Attribute } from '../types/types';
import { $ } from '../utils/domSelectors';

class Input {
  private attributes: Attribute;

  constructor(attributes: Attribute) {
    this.attributes = attributes;
  }

  showErrorMessage(message: string) {
    const caption = $(`#${this.attributes.id}-caption`) as HTMLSpanElement;
    // show error message for form selects
  }

  addRemoveErrorMessageEvent(message?: string) {
    const element = $(`#${this.attributes.id}`) as HTMLSelectElement;
    // remove error message for form selects on change
  }

  create() {
    return ` 
      <input
        type=${this.attributes.type} 
        name=${this.attributes.name}
        id=${this.attributes.id}
        required=${this.attributes.required}
      />`;
  }
}

export default Input;
