import { Attribute } from '../types/types';
import { $ } from '../utils/domSelectors';

class Input {
  private attributes: Attribute;

  constructor(attributes: Attribute) {
    this.attributes = attributes;
  }

  showErrorMessage(message: string) {
    const caption = $(`#${this.attributes.id}-caption`) as HTMLSpanElement;
    caption.classList.add('error-text');
    caption.textContent = message;
  }

  addRemoveErrorMessageEvent(message?: string) {
    const element = $(`#${this.attributes.id}`) as HTMLSelectElement;

    element.addEventListener(
      'input',
      (event: Event) => {
        const target = event.target as HTMLInputElement;
        const caption = $(`#${target.id}-caption`) as HTMLSpanElement;
        caption.classList.remove('error-text');

        if (message) caption.textContent = message;
      },
      { once: true }
    );
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
