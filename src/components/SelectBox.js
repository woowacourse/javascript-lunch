class SelectBoxComponent {
  $target;
  attributes;
  eventHandler;
  options;

  constructor({ $target, attributes, eventHandler, options }) {
    this.$target = $target;
    this.attributes = attributes;
    this.eventHandler = eventHandler;
    this.options = options;
    this.render();
    this.setEvent();
  }

  setEvent() {
    this.$target.addEventListener('change', this.eventHandler);
  }

  render() {
    this.$target.insertAdjacentHTML(
      'beforeend',
      `<select name=${this.attributes.name} id=${this.attributes.id} class=${this.attributes.class} ${this.attributes.required && 'required'}>
    ${this.options.map(option => this.#getSelectOption(option)).join('')}
</select>`,
    );
  }

  #getSelectOption(selectOption) {
    return `<option value=${selectOption.value}>${selectOption.text}</option>`;
  }
}

export default SelectBoxComponent;
