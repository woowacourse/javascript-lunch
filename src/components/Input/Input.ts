import BaseComponent from '../BaseComponent';

type InputProps = {
  inputType?: 'text';
  inputId: string;
  inputName: string;
  inputMax?: string;
};

class Input extends BaseComponent {
  #inputId;
  #inputName;
  #inputType;
  #inputMax;

  constructor({ inputId, inputType, inputMax, inputName }: InputProps) {
    super();
    this.#inputId = inputId;
    this.#inputName = inputName;
    this.#inputType = inputType ?? 'text';
    this.#inputMax = inputMax;
  }

  render() {
    const $input = document.createElement('input');
    $input.setAttribute('type', this.#inputType);
    $input.id = this.#inputId;
    $input.name = this.#inputName;
    if (this.#inputMax) $input.setAttribute('max', this.#inputMax);

    this.replaceWith($input);
  }
}

export default Input;

customElements.define('input-box', Input);
