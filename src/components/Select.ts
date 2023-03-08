import { Attribute, Option } from '../types/types';
import { $ } from '../utils/domSelectors';

class Select {
  private attributes: Attribute;
  private options: Option;

  constructor(attributes: Attribute, options: Option) {
    this.attributes = attributes;
    this.options = options;
  }

  showErrorMessage(message: string) {
    const caption = $(`#${this.attributes.id}-caption`) as HTMLSpanElement;
    caption.classList.add('error-text');
    caption.textContent = message;
  }

  addRemoveErrorMessageEvent(message?: string) {
    const element = $(`#${this.attributes.id}`) as HTMLSelectElement;
    // remove error message for form selects on change
  }

  addSelectChangeEvent(changeFilter: CallableFunction) {
    const element = $(`#${this.attributes.id}`) as HTMLSelectElement;

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
