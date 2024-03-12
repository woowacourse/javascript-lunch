import InputProps from './props/InputProps';

class Input extends HTMLInputElement {
  constructor(props: InputProps) {
    super();

    const { type, name, id, required } = props;
    this.type = type;
    this.name = name;
    this.id = id;
    this.required = required;
  }

  getValue(): string {
    return this.value;
  }
}

customElements.define('matzip-input', Input, { extends: 'input' });

export default Input;
