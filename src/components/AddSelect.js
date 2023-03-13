class AddSelect extends HTMLElement {
  createOption(title, kind) {
    if (kind === 'distance') {
      return `<option value="${title}">${title}분 내</option>`;
    }
    return `<option value="${title}">${title}</option>`;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.setRemoveErrorEvent();
  }

  getSelectValue() {
    const id = this.getAttribute('id');
    return this.shadowRoot.querySelector(`#${id}`).value;
  }

  isError() {
    this.removeError();

    if (this.getSelectValue() === '') return true;
    return false;
  }

  static get observedAttributes() {
    return ['name', 'id', 'options'];
  }

  reset() {
    const id = this.getAttribute('id');
    this.shadowRoot.querySelector(`#${id}`).value = '';
  }

  removeError() {
    const errorMessage = this.shadowRoot.querySelector('.error');

    if (errorMessage) {
      this.shadowRoot.querySelector('.container').removeChild(errorMessage);
    }
  }

  render() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const optionsAttribute = this.getAttribute('options').split(',');
    const options = optionsAttribute.map((option) =>
      this.createOption(option, id)
    );

    this.shadowRoot.innerHTML = `
    <div class="container">
      <label for="${id}" class="text-caption">${name}</label>
        <select name="${id}" id="${id}" required>
          <option value="">선택해 주세요</option>
            ${options.join('\n')}
        </select>
    </div>
    `;
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
        z-index:1;
      }
      
      label {
        color: var(--grey-400);
        font-size: 14px;
      }
      
      label::after {
        padding-left: 4px;
        color: var(--primary-color);
        content: "*";
      }
      
      .container .help-text {
        color: var(--grey-300);
      }
      
      select {
        height:44px;
        padding: 8px;
        margin: 6px 0;
        border: 1px solid var(--grey-200);
        border-radius: 8px;
        font-size: 16px;
      }

      .error{
        padding: 2px 6px;
        color: red;
      }
`;

    this.shadowRoot.append(componentStyle);
  }

  setRemoveErrorEvent() {
    this.shadowRoot.querySelector('select').addEventListener('change', () => {
      if (this.getSelectValue()) {
        this.removeError();
      }
    });
  }

  showErrorMessage() {
    const errorMessage = document.createElement('div');
    errorMessage.innerText = '이 값은 필수로 입력해야 합니다.';
    errorMessage.className = 'error text-caption';
    this.shadowRoot.querySelector('.container').append(errorMessage);
  }
}

export default AddSelect;
