import BaseComponent from '@/components/BaseComponent';

interface InputBoxArgs {
  name: string;
  idName: string;
  hasVerification?: boolean;
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
     ${helpText ? `<span class="help-text text-caption">${helpText}</span>` : ''}
     ${
       hasVerification ? `<div class="error hidden">${this.name} 값은 필수 입력입니다.</span>` : ''
     }    
    `;

    this.classList.add('form-item', ...(classList ?? []));

    if (isRequired) {
      this.classList.add('form-item--required');
    }
  }

  occurError() {}
}
customElements.define('vertical-input-box', VerticalInputBox, { extends: 'div' });

export default VerticalInputBox;
