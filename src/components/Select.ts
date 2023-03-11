import { Option, Attribute } from '../types/ui';
import { $ } from '../utils/domSelectors';

class Select {
  private attributes: Attribute;
  private options: Option;

  constructor(attributes: Attribute, options: Option) {
    this.attributes = attributes;
    this.options = options;
  }

  addSelectChangeEvent(handleOptionChange: CallableFunction) {
    const element = $<HTMLSelectElement>(`#${this.attributes.id}`);

    element.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const selectedOption = target.value;
      handleOptionChange({ [target.name]: selectedOption });
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
