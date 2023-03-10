import { Attribute } from '../types/ui';
import { $ } from '../utils/domSelectors';

class Input {
  private attributes: Attribute;

  constructor(attributes: Attribute) {
    this.attributes = attributes;
  }

  showErrorMessage(message: string) {
    const caption = $<HTMLSpanElement>(`#${this.attributes.id}-caption`);
    caption.classList.add('error-text');
    caption.textContent = message;
  }

  addRemoveErrorMessageEvent(message?: string) {
    const element = $<HTMLSelectElement>(`#${this.attributes.id}`);

    element.addEventListener(
      'input',
      (event: Event) => {
        const target = event.target as HTMLInputElement;
        const caption = $<HTMLSpanElement>(`#${target.id}-caption`);
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
