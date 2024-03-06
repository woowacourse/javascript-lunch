class FilterBox extends HTMLElement {
  static observedAttributes = ['type', 'option'];

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
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
    this.querySelector('select').addEventListener('change', (event) => {
      this.dispatchEvent(
        new CustomEvent('selectChange', {
          bubbles: true,
        }),
      );
    });
  }

  removeEvent() {}

  template(type, option) {
    return `
      <select name=${type} id=${type} class=${type}>
        ${option.map((el) => `<option value=${el}>${el}</option>`).join('')}
      </select>
    `;
  }
}

export default FilterBox;
