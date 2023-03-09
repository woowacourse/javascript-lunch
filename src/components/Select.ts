import { Option, Attribute } from '../types/types';
import { $ } from '../utils/domSelectors';

class Select {
  private attributes: Attribute;
  private options: Option;

  constructor(attributes: Attribute, options: Option) {
    this.attributes = attributes;
    this.options = options;
  }

  showErrorMessage(message: string) {
    const caption = $<HTMLSpanElement>(`#${this.attributes.id}-caption`);
    caption.classList.add('error-text');
    caption.textContent = message;
  }

  addRemoveErrorMessageEvent(message?: string) {
    const element = $<HTMLSelectElement>(`#${this.attributes.id}`);

    element.addEventListener(
      'change',
      (event: Event) => {
        const target = event.target as HTMLSelectElement;
        const caption = $<HTMLSpanElement>(`#${target.id}-caption`);
        caption.classList.remove('error-text');

        if (message) element.textContent = message;
      },
      { once: true }
    );
  }

  addSelectChangeEvent(changeFilter: CallableFunction) {
    const element = $<HTMLSelectElement>(`#${this.attributes.id}`);

    element.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const selectedOption = target.value;
      changeFilter({ [target.name]: selectedOption });
    });
  }

  create() {
    return ` 
      <select 
        name=${this.attributes.name}
        id=${this.attributes.id}
        class=${this.attributes.className} 
        required=${this.attributes.required}
      >
        ${this.createSelectOptions()}
      </select>`;
  }

  createSelectOptions() {
    return this.options.text
      .map((option, index) => `<option value='${this.options.value[index]}'> ${option} </option>`)
      .join('');
  }
}

export default Select;
