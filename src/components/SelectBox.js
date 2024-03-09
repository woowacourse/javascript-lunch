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
    const { name, id, class: className, required } = this.attributes;
    const selectTag = document.createElement('select');
    selectTag.name = name;
    selectTag.id = id;
    selectTag.classList.add(className);
    selectTag.required = required ? true : false;

    this.options.forEach(option => {
      const optionTag = this.#getOptionTag(option);
      selectTag.appendChild(optionTag);
    });
    this.$target.appendChild(selectTag);
  }

  #getOptionTag(selectOption) {
    const optionTag = document.createElement('option');
    optionTag.value = selectOption.value;
    optionTag.textContent = selectOption.text;
    return optionTag;
  }
}

export default SelectBoxComponent;
