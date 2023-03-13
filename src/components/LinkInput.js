import TextInput from './TextInput';

class LinkInput extends TextInput {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.setErrorRemoveEvent();
  }

  render() {
    const id = this.getAttribute('id');
    const name = this.getAttribute('name');
    const caption = this.getAttribute('caption');

    this.shadowRoot.innerHTML = `
    <div class="container">
      <label for="${id}" class="text-caption">${name}</label>
      <input type="text" name="${id}" id="${id}">
      <span class="help-text text-caption">${caption}</span>
      <div id="lengthContainer" class="length-info">
        <span id="length">0</span>
        <span>/100</span>
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
    if (textValue.length > 100) {
      return '링크 값은 100자 이하로만 가능합니다.';
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
    if (textValue.length > 100) {
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

export default LinkInput;
