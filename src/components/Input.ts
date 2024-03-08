export interface InputProps {
  type: string;
  name: string;
  id: string;
  required: boolean;
}

class Input extends HTMLInputElement {
  constructor(props: InputProps) {
    super();

    const { type, name, id, required } = props;
    this.type = type;
    this.name = name;
    this.id = id;
    this.required = required;
  }
}

customElements.define('matzip-input', Input, { extends: 'input' });

export default Input;
