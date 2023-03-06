import './index.css';

class FilterList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const optionsAttribute = this.getAttribute('options').split(',');
    const options = optionsAttribute.map((option) => this.createOption(option));

    this.innerHTML = `<select name="${name}" id="${id}" class="restaurant-filter">
    ${options.join('\n')}
  </select>`;
  }

  createOption(title) {
    return `<option value="${title}">${title}</option>`;
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

export default FilterList;
