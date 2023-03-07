import './index.css';

class SelectList extends HTMLElement {
  constructor() {
    super();
  }

  createOption(title, kind) {
    return `<option value="${title}">${title}${
      kind === 'distance' ? '분 내' : ''
    }</option>`;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const optionsAttribute = this.getAttribute('options').split(',');
    const options = optionsAttribute.map((option) =>
      this.createOption(option, id)
    );

    this.innerHTML = `
    <div class="form-item form-item--required">
      <label for="${id}List">${name}</label>
      <select name="${id}" id="${id}List" required>
      <option value="">선택해 주세요</option>
        ${options.join('\n')}
      </select>
    </div>
    `;
  }

  static get observedAttributes() {
    return ['name', 'id', 'options'];
  }

  attributeChangedCallback(name) {
    if (name === 'name' && name === 'id' && name === 'options') {
      this.connectedCallback();
    }
  }
}

export default SelectList;
