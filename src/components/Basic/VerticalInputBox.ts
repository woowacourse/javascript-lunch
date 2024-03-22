import { dom } from '@/util/dom';

interface InputBoxProps {
  styleVariant: 'vertical' | 'horizontal';
  name: string;
  idName?: string;
  hasVerification?: boolean;
  classNames?: string[];
  isRequired?: boolean;
  helpText?: string;
}

class InputBox extends HTMLDivElement implements InputBoxProps {
  styleVariant: 'vertical' | 'horizontal' = 'vertical';
  name: string = '';
  idName: string = '';
  hasVerification: boolean = false;
  isRequired: boolean = false;
  helpText: string = '';
  $label: HTMLLabelElement;
  $input: HTMLInputElement;
  $help: HTMLSpanElement;
  $error: HTMLDivElement;

  constructor(props: InputBoxProps) {
    super();
    this.classList.add('input-box');
    this.innerHTML = this.#template();

    this.$label = dom.getElement<HTMLLabelElement>(this, ':scope > label');
    this.$input = dom.getElement<HTMLInputElement>(this, ':scope > input');
    this.$help = dom.getElement<HTMLSpanElement>(this, ':scope > span');
    this.$error = dom.getElement<HTMLDivElement>(this, ':scope > .error');

    if (props) {
      this.setState(props);
    }
    this.print();
  }

  #template() {
    return `
    <label class="text-caption"></label>
    <input type="text" name=""  id="" />
    <span class="help-text text-caption"></span>
    <div class="error invisible"></span>
    `;
  }

  setState(props: InputBoxProps) {
    const { name, idName, classNames, hasVerification, isRequired, helpText } = props;
    this.name = name;
    this.idName = idName ?? '';
    this.classList.add(...(classNames ?? []));
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
    this.$label.htmlFor = `${this.idName} text-caption`;
    this.$label.innerText = this.name;

    this.$input.name = this.idName;
    this.$input.id = this.idName;

    if (this.helpText) this.$help.innerText = this.helpText;
    if (this.hasVerification) this.$error.innerText = `${this.name} 값은 필수 입력입니다.`;
  }

  visibleError() {
    this.$error.classList.remove('invisible');
  }
  invisibleError() {
    this.$error.classList.add('invisible');
  }
}
customElements.define('input-box', InputBox, { extends: 'div' });

export default InputBox;
