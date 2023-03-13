import { $ } from '../utils';

class FilterBox extends HTMLElement {
  changeValueEvent() {
    this.shadowRoot.querySelector('select').addEventListener('change', () => {
      $('restaurant-boxes').drawRestaurants();
      window.scrollTo(0, 0);
    });
  }

  createOption(title) {
    return `<option value="${title}">${title}</option>`;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.changeValueEvent();
  }

  getSelectValue() {
    const id = this.getAttribute('id');
    return this.shadowRoot.querySelector(`#${id}`).value;
  }

  static get observedAttributes() {
    return ['name', 'id', 'options'];
  }

  render() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const optionsAttribute = this.getAttribute('options').split(',');
    const options = optionsAttribute.map((option) => this.createOption(option));

    this.shadowRoot.innerHTML = `
      <select name="${name}" id="${id}">
        ${options.join('\n')}
      </select>
    `;
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
        select {
          height: 44px;
          min-width: 125px;
          padding: 8px;
          border: 1px solid #d0d5dd;
          border-radius: 8px;
          background: transparent;
          font-size: 16px;
        }
`;

    this.shadowRoot.append(componentStyle);
  }
}

export default FilterBox;
