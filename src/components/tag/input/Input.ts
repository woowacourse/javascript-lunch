import InputProps from './InputProps';
import './input.css';

class Input extends HTMLInputElement {
  constructor(props: InputProps) {
    super();

    const { type, name, id, required, pattern } = props;
    this.type = type;
    this.name = name;
    this.id = id;
    this.required = required;
    if (pattern !== undefined) this.pattern = pattern.toString().slice(1,-1);
  }

  getValue(): string {
    return this.value;
  }

  isValidate() {
    return this.validity.valid;
  }
}

customElements.define('matzip-input', Input, { extends: 'input' });

export default Input;
