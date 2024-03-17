import BaseComponent from '@/components/BaseComponent';

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
    <div class="error hidden"></span>`;

    this.#name = this.querySelector(':scope > label') as HTMLLabelElement;
    this.#input = this.querySelector(':scope > input') as HTMLInputElement;
    this.#help = this.querySelector(':scope > span') as HTMLSpanElement;
    this.#error = this.querySelector(':scope > .error') as HTMLDivElement;

    if (props) {
      this.setState(props);
    } else {
      this.print();
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
