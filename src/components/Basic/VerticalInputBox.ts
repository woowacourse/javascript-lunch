import { dom } from '@/util/dom';

interface Props {
  name?: string;
  idName?: string;
  hasVerification?: boolean;
  classList?: string[];
  isRequired?: boolean;
  helpText?: string;
}

class VerticalInputBox extends HTMLDivElement {
  name: string = '';
  idName: string = '';
  hasVerification: boolean = false;
  isRequired: boolean = false;
  helpText: string = '';
  #name: HTMLLabelElement;
  #input: HTMLInputElement;
  #help: HTMLSpanElement;
  #error: HTMLDivElement;

  constructor(props: Props) {
    super();

    this.classList.add('input-box');

    this.innerHTML = `
    <label class="text-caption"></label>
    <input type="text" name=""  id="" />
    <span class="help-text text-caption"></span>
    <div class="error invisible"></span>`;

    this.#name = dom.getElement<HTMLLabelElement>(this, ':scope > label');
    this.#input = dom.getElement<HTMLInputElement>(this, ':scope > input');
    this.#help = dom.getElement<HTMLSpanElement>(this, ':scope > span');
    this.#error = dom.getElement<HTMLDivElement>(this, ':scope > .error');

    if (props) {
      this.setState(props);
    }
    this.print();
  }

  setState(props: Props) {
    const { name, idName, classList, hasVerification, isRequired, helpText } = props;
    this.name = name ?? '';
    this.idName = idName ?? '';
    this.classList.add(...(classList ?? []));
    this.hasVerification = hasVerification ?? false;
    this.isRequired = isRequired ?? false;
    this.helpText = helpText ?? '';

    this.classList.add('form-item');
    if (this.isRequired) {
      this.classList.add('form-item--required');
    }
    this.print();
  }

  print() {
    this.#name.htmlFor = `${this.idName} text-caption`;
    this.#name.innerText = this.name;

    this.#input.name = this.idName;
    this.#input.id = this.idName;

    if (this.helpText) {
      this.#help.innerText = this.helpText;
    }
    if (this.hasVerification) {
      this.#error.innerText = `${this.name} 값은 필수 입력입니다.`;
    }
  }

  occurError() {}
}
customElements.define('vertical-input-box', VerticalInputBox, { extends: 'div' });

export default VerticalInputBox;
