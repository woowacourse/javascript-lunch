import { GLOBAL_CSS } from '../constants';

class AddTextInput extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const globalStyle = document.createElement('style');
    const componentStyle = document.createElement('style');
    globalStyle.textContent = GLOBAL_CSS;
    componentStyle.textContent = `
    .form-item {
        display: flex;
        flex-direction: column;
      
        margin-bottom: 36px;
      }
      
      .form-item label {
        color: var(--grey-400);
        font-size: 14px;
      }
      
      .form-item--required label::after {
        padding-left: 4px;
      
        color: var(--primary-color);
        content: "*";
      }
      
      .form-item .help-text {
        color: var(--grey-300);
      }
      
      .form-item input,
      .form-item textarea,
      .form-item select {
        padding: 0 8px;
        margin: 6px 0;
      
        border: 1px solid var(--grey-200);
        border-radius: 8px;
      
        font-size: 16px;
      }
      
      .form-item textarea {
        resize: none;
      }
      
      .form-item select {
        height: 44px;
      
        padding: 8px;
      
        border: 1px solid var(--grey-200);
        border-radius: 8px;
      
        color: var(--grey-300);
      }
      
      input[name="name"],
      input[name="link"] {
        height: 44px;
      }
`;

    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const caption = this.getAttribute('caption') || '';

    if (id === 'name') {
      this.shadowRoot.innerHTML = `
        <div class="form-item form-item--required">
                <label for="${id} text-caption">${name}</label>
                <input type="text" name="${id}" id="${id}Input" required>
              </div>
        `;
    }

    if (id === 'description') {
      this.shadowRoot.innerHTML = `
      <div class="form-item">
            <label for="${id} text-caption">${name}</label>
            <textarea name="${id}" id="${id}Input" cols="30" rows="5"></textarea>
            <span class="help-text text-caption">${caption}</span>
          </div>
        `;
    }

    if (id === 'link') {
      this.shadowRoot.innerHTML = `
        <div class="form-item">
                <label for="${id} text-caption">${name}</label>
                <input type="text" name="${id}" id="${id}Input">
                <span class="help-text text-caption">${caption}</span>
              </div>
        `;
    }

    this.shadowRoot.append(globalStyle, componentStyle);
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
}

export default AddTextInput;
