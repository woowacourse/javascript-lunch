import { GLOBAL_CSS } from '../constants';

class AddSelect extends HTMLElement {
  createOption(title, kind) {
    if (kind === 'distance') {
      return `<option value="${title}">${title}분 내</option>`;
    }
    return `<option value="${title}">${title}</option>`;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const globalStyle = document.createElement('style');
    const componentStyle = document.createElement('style');
    globalStyle.textContent = GLOBAL_CSS;
    componentStyle.textContent = `
    .form-item {
        z-index:1;
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
        padding: 8px;
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
`;

    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const optionsAttribute = this.getAttribute('options').split(',');
    const options = optionsAttribute.map((option) =>
      this.createOption(option, id)
    );

    this.shadowRoot.innerHTML = `
    <div class="form-item form-item--required">
    <label for="${id} text-caption">${name}</label>
    <select name="${id}" id="${id}" required>
    <option value="">선택해 주세요</option>
      ${options.join('\n')}
    </select>
  </div>
    `;

    this.shadowRoot.append(globalStyle, componentStyle);
  }

  static get observedAttributes() {
    return ['name', 'id', 'options'];
  }

  attributeChangedCallback(name) {
    if (name === 'name' && name === 'id' && name === 'options') {
      this.connectedCallback();
    }
  }

  reset() {
    const id = this.getAttribute('id');
    this.shadowRoot.querySelector(`#${id}`).value = '';
  }
}

export default AddSelect;
