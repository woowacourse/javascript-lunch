import BaseComponent from '@/components/BaseComponent';

interface InputBoxArgs {
  name: string;
  idName: string;
  hasVerification: boolean;
  classList?: string[];
  isRequired?: boolean;
  helpText?: string;
}

class VerticalInputBox extends HTMLDivElement {
  name: string;
  idName: string;

  constructor({ name, idName, classList, hasVerification, isRequired, helpText }: InputBoxArgs) {
    super();
    this.name = name;
    this.idName = idName;

    this.innerHTML = `
    <label for="${this.idName} text-caption">${this.name}</label>
     <input type="text" name=${this.idName} id=${this.idName} />
    `;

    this.classList.add('form-item', ...(classList ?? []));

    if (isRequired) {
      this.classList.add('form-item--required');
    }
    if (helpText) {
      this.append(this.#makeHelpText(helpText));
    }
    if (hasVerification) {
      this.append(this.#makeErrorBox());
    }
  }

  #makeErrorBox() {
    const errorBox = document.createElement('div');
    errorBox.classList.add('error', 'hidden');
    errorBox.textContent = `${this.name} 값은 필수 입력입니다.`;
    return errorBox;
  }

  #makeHelpText(helpText: string) {
    const helpTextSpan = document.createElement('span');
    helpTextSpan.classList.add('help-text', 'text-cation');
    helpTextSpan.textContent = `${helpText}`;
    return helpTextSpan;
  }
}
customElements.define('vertical-input-box', VerticalInputBox, { extends: 'div' });

export default VerticalInputBox;
