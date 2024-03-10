import InputProps from './InputProps';

class Input extends HTMLInputElement {
  constructor(props: InputProps) {
    super();

    const { type, name, id, required, pattern } = props;
    this.type = type;
    this.name = name;
    this.id = id;
    this.required = required;
    if (pattern !== undefined) this.pattern = pattern;
  }

  getValue(): string {
    return this.value;
  }
}

customElements.define('matzip-input', Input, { extends: 'input' });

export default Input;
