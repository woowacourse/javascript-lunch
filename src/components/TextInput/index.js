import './index.css';

class TextInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const caption = this.getAttribute('caption') || '';

    if (id === 'name') {
      this.innerHTML = `
        <div class="form-item form-item--required">
          <label for="${id} text-caption">${name}</label>
          <input type="text" name="${id}" id="${id}" required>
        </div>
        `;
    }

    if (id === 'description') {
      this.innerHTML = `
        <div class="form-item">
          <label for="${id} text-caption">${name}</label>
          <textarea name="${id}" id="${id}" cols="30" rows="5"></textarea>
          <span class="help-text text-caption">${caption}</span>
        </div>
        `;
    }

    if (id === 'link') {
      this.innerHTML = `
        <div class="form-item">
          <label for="${id} text-caption">${name}</label>
          <input type="text" name="${id}" id="${id}">
          <span class="help-text text-caption">${caption}</span>
        </div>
        `;
    }
  }

  static get observedAttributes() {
    return ['name', 'id', 'caption'];
  }

  attributeChangedCallback(name) {
    if (name === 'name' && name === 'id' && name === 'caption') {
      this.connectedCallback();
    }
  }
}

export default TextInput;
