import Component from './Component';
import { $ } from '../utils/dom';

class FilterBox extends Component {
  static observedAttributes = ['type', 'option'];

  constructor() {
    super();
  }

  render() {
    const type = this.getAttribute('type');
    const option = JSON.parse(this.getAttribute('option'));

    this.innerHTML = this.template(type, option);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  setEvent() {
    $('select').addEventListener('change', () => this.makeCustomEvent('selectChange'));
  }

  removeEvent() {
    $('select').removeEventListener('change', () => this.makeCustomEvent('selectChange'));
  }

  template(type, option) {
    return `
      <select name=${type} id=${type} class=${type}>
        ${option.map((el) => `<option value=${el.value}>${el.name}</option>`).join('')}
      </select>
    `;
  }
}

export default FilterBox;
