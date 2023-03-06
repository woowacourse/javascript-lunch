class AddTextInput extends HTMLElement {
  getTextInputTemplate() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const caption = this.getAttribute('caption') || '';

    if (name === 'name') {
      return `<div class="container required">
      <label for="${id} text-caption">${name}</label>
      <input type="text" name="${id}" id="${id}" required>
    </div>`;
    }

    if (name === 'description') {
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
`;

    this.shadowRoot.innerHTML = this.getTextInputTemplate();

    this.shadowRoot.append(componentStyle);
  }

  static get observedAttributes() {
    return ['name', 'id', 'caption'];
  }

  attributeChangedCallback(name) {
    if (name === 'name' && name === 'id' && name === 'caption') {
      this.connectedCallback();
    }
  }

  reset() {
    const id = this.getAttribute('id');
    this.shadowRoot.querySelector(`#${id}`).value = '';
  }

  getTextValue() {
    const id = this.getAttribute('id');
    return this.shadowRoot.querySelector(`#${id}`).value;
  }
}

export default AddTextInput;
