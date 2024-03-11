import BaseComponent from '@/components/BaseComponent';

interface InputBoxArgs {
  name: string;
  idName: string;
  hasVerification: boolean;
  classList?: string[];
  isRequired?: boolean;
}

class VerticalInputBox extends HTMLDivElement {
  name: string;
  idName: string;
  #hasVerification: boolean;
  #classList?: string[];
  isRequired?: boolean;

  constructor({ name, idName, classList, hasVerification, isRequired }: InputBoxArgs) {
    super();
    this.name = name;
    this.idName = idName;
    this.#hasVerification = hasVerification;

    this.classList.add('form-item', ...(classList ?? []));
    if (hasVerification) {
      this.#makeErrorBox();
    }
    if (isRequired) {
      this.classList.add('form-item--required');
    }
  }

  connectedCallback() {
    this.#render();
    this.#setEvent();
  }

  #render() {
    this.innerHTML = `
    <label for="${this.idName} text-caption">${this.name}</label>
     <input type="text" name=${this.idName} id=${this.idName} />
    `;
    if (this.#hasVerification) {
      this.append(this.#makeErrorBox());
    }
  }
  #setEvent() {}

  #makeErrorBox() {
    const errorBox = document.createElement('div');
    errorBox.classList.add('error', 'hidden');
    errorBox.textContent = `${this.name} 값은 필수 입력입니다.`;
    return errorBox;
  }
}
customElements.define('vertical-input-box', VerticalInputBox, { extends: 'div' });

export default VerticalInputBox;
