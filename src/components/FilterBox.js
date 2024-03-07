import Component from './Component';
import { $ } from '../utils/dom';

class FilterBox extends Component {
  static observedAttributes = ['type', 'option'];

  constructor() {
    super();
  }

  render() {
    const type = this.getAttribute('type');
    const option = this.getAttribute('option').split(',');

    this.innerHTML = this.template(type, option);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  setEvent() {
    $('select').addEventListener('change', (event) => {
      this.dispatchEvent(
        new CustomEvent('selectChange', {
          bubbles: true,
        }),
      );
    });
  }

  template(type, option) {
    return `
      <select name=${type} id=${type} class=${type}>
        ${option.map((el) => `<option value=${el}>${el}</option>`).join('')}
      </select>
    `;
  }
}

export default FilterBox;
