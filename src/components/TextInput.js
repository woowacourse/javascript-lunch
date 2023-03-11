class TextInput extends HTMLElement {
  getTextValue() {
    const id = this.getAttribute('id');
    return this.shadowRoot.querySelector(`#${id}`).value.trim();
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
    this.shadowRoot.querySelector('#length').innerText = '0';
  }

  setComponentStyle() {
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
        font-size: 14px;
        color: var(--grey-400);
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
        padding: 2px 6px;
        color: red;
      }

      .length-info{
        display:flex;
        justify-content:end;
        font-size: 12px;
        line-height: 20px;
        font-weight: 400;
        color:var(--grey-300);
      }

      .length-error{
        color:var(--primary-color);
      }
`;

    this.shadowRoot.append(componentStyle);
  }

  showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.innerText = message;
    errorMessage.className = 'error text-caption';
    this.shadowRoot.querySelector('.container').append(errorMessage);
  }
}

export default TextInput;
