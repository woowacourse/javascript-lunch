import { GLOBAL_CSS } from '../constants';
import { $ } from '../utils';

class FilterBox extends HTMLElement {
  createOption(title) {
    return `<option value="${title}">${title}</option>`;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const globalStyle = document.createElement('style');
    const componentStyle = document.createElement('style');
    globalStyle.textContent = GLOBAL_CSS;
    componentStyle.textContent = `
    select {
    height: 44px;
    min-width: 125px;
  
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    background: transparent;
  
    font-size: 16px;
  }
  
  .restaurant-filter {
    padding: 8px;
  }
`;

    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const optionsAttribute = this.getAttribute('options').split(',');
    const options = optionsAttribute.map((option) => this.createOption(option));

    this.shadowRoot.innerHTML = `
    <select name="${name}" id="${id}" class="restaurant-filter">
        ${options.join('\n')}
      </select>
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

  getSelectValue() {
    const id = this.getAttribute('id');
    return this.shadowRoot.querySelector(`#${id}`).value;
  }
}

export default FilterBox;
