import { GLOBAL_CSS } from '../constants';

class FilterBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  createOption(title) {
    return `<option value="${title}">${title}</option>`;
  }

  connectedCallback() {
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

    const template = document.createElement('template');

    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const optionsAttribute = this.getAttribute('options').split(',');
    const options = optionsAttribute.map((option) => this.createOption(option));

    template.innerHTML = `
    <select name="${name}" id="${id}Select" class="restaurant-filter">
        ${options.join('\n')}
      </select>
    `;

    const cloneNode = template.content.cloneNode(true);

    this.shadowRoot.appendChild(globalStyle);
    this.shadowRoot.appendChild(componentStyle);
    this.shadowRoot.appendChild(cloneNode);
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

export default FilterBox;
