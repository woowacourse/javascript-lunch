import TextInput from './TextInput';

class NameInput extends TextInput {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.setErrorRemoveEvent();
  }

  render() {
    const id = this.getAttribute('id');
    const name = this.getAttribute('name');

    this.shadowRoot.innerHTML = `
    <div class="container required">
      <label for="${id}" class="text-caption">${name}</label>
      <input type="text" name="${id}" id="${id}" required>
      <div id="lengthContainer" class="length-info">
        <span id="length">0</span>
        <span>/30</span>
      </div>
    </div>`;
  }

  getErrorKind() {
    this.removeError();

    const textValue = this.getTextValue();

    const errorMessage = this.getErrorMessage(textValue);
    if (errorMessage) {
      return errorMessage;
    }

    return false;
  }

  getErrorMessage(textValue) {
    if (textValue === '') return '이 값은 필수로 입력해야 합니다.';
    if (textValue.length > 30 || textValue.length < 2) {
      return '이름은 2자 이상 30자 이하만 가능합니다.';
    }
    return null;
  }

  setErrorRemoveEvent() {
    const id = this.getAttribute('id');

    this.shadowRoot.querySelector(`#${id}`).addEventListener('input', () => {
      const textValue = this.getTextValue();
      const nameError = this.getErrorMessage(textValue);

      this.shadowRoot.querySelector(
        '#length'
      ).innerText = `${textValue.length}`;

      this.setLengthError(textValue);

      if (nameError === null) {
        this.removeError();
      }
    });
  }

  setLengthError(textValue) {
    if (textValue.length > 30) {
      this.shadowRoot
        .querySelector('#lengthContainer')
        .classList.add('length-error');
      return;
    }

    this.shadowRoot
      .querySelector('#lengthContainer')
      .classList.remove('length-error');
  }
}

export default NameInput;
