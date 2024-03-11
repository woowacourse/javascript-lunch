import Component from './Component';

class FilterBox extends Component {
  static observedAttributes = ['type', 'option'];

  #type;
  #option;

  constructor() {
    super();

    this.#type = this.getAttribute('type');
    this.#option = JSON.parse(this.getAttribute('option'));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#type = this.getAttribute('type');
    this.#option = JSON.parse(this.getAttribute('option'));

    this.render();
  }

  template() {
    return `
      <select name=${this.#type} id=${this.#type} class=${this.#type}>
        ${this.#option.map((el) => `<option value=${el.value}>${el.name}</option>`).join('')}
      </select>
    `;
  }
}

export default FilterBox;
