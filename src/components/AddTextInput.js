class AddTextInput extends HTMLElement {
  attributeChangedCallback(name) {
    if (name === 'name' && name === 'id' && name === 'caption') {
      this.connectedCallback();
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .text-caption {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
      }
      
      .container {
        display: flex;
        flex-direction: column;
      
        margin-bottom: 36px;
      }
      
      label {
        color: var(--grey-400);
        font-size: 14px;
      }
      
      .required label::after {
        padding-left: 4px;
      
        color: var(--primary-color);
        content: "*";
      }
      
      .help-text {
        color: var(--grey-300);
      }
      
      input, textarea
       {
        padding: 0 8px;
        margin: 6px 0;
      
        border: 1px solid var(--grey-200);
        border-radius: 8px;
      
        font-size: 16px;
      }
      
      textarea {
        padding: 8px;
        resize: none;
      }
      
      input {
        height: 44px;
      }

      .error{
        color: red;
        padding: 2px 6px;
      }
`;

    this.shadowRoot.innerHTML = this.getTextInputTemplate();

    this.shadowRoot.append(componentStyle);

    this.setErrorRemoveEvent();
  }

  getErrorKind() {
    this.removeError();

    const id = this.getAttribute('id');
    const textValue = this.getTextValue();

    const nameError = this.getNameErrorMessage(id, textValue);
    if (nameError) {
      return nameError;
    }

    const textError = this.getTextErrorMessage(id, textValue);
    if (textError) {
      return textError;
    }

    return false;
  }

  getNameErrorMessage(kind, textValue) {
    if (kind !== 'name') return null;
    if (textValue === '') return '이 값은 필수로 입력해야 합니다.';
    if (textValue.length > 30 || textValue.length < 2) {
      return '이름은 2자 이상 30자 이하만 가능합니다.';
    }
    return null;
  }

  getTextErrorMessage(kind, textValue) {
    if (textValue.length > 1000) {
      return `${
        kind === 'link' ? '링크' : '설명'
      } 값은 1000자 이하로만 가능합니다.`;
    }
    return null;
  }

  getTextInputTemplate() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const caption = this.getAttribute('caption') || '';

    if (id === 'name') {
      return `<div class="container required">
              <label for="${id} text-caption">${name}</label>
              <input type="text" name="${id}" id="${id}" required>
            </div>`;
    }

    if (id === 'description') {
      return `<div class="container">
                <label for="${id} text-caption">${name}</label>
                <textarea name="${id}" id="${id}" cols="30" rows="5"></textarea>
                <span class="help-text text-caption">${caption}</span>
              </div>`;
    }

    return `<div class="container">
              <label for="${id} text-caption">${name}</label>
              <input type="text" name="${id}" id="${id}">
              <span class="help-text text-caption">${caption}</span>
            </div>`;
  }

  getTextValue() {
    const id = this.getAttribute('id');
    return this.shadowRoot.querySelector(`#${id}`).value;
  }

  static get observedAttributes() {
    return ['name', 'id', 'caption'];
  }

  removeError() {
    const errorMessage = this.shadowRoot.querySelector('.error');

    if (errorMessage) {
      this.shadowRoot.querySelector('.container').removeChild(errorMessage);
    }
  }

  reset() {
    const id = this.getAttribute('id');
    this.shadowRoot.querySelector(`#${id}`).value = '';
  }

  setErrorRemoveEvent() {
    const id = this.getAttribute('id');

    this.shadowRoot.querySelector(`#${id}`).addEventListener('input', () => {
      const textValue = this.getTextValue();
      const nameError = this.getNameErrorMessage(id, textValue);
      const textError = this.getTextErrorMessage(id, textValue);
      if (nameError === null && textError === null) {
        this.removeError();
      }
    });
  }

  showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.innerText = message;
    errorMessage.className = 'error text-caption';
    this.shadowRoot.querySelector('.container').append(errorMessage);
  }
}

export default AddTextInput;
