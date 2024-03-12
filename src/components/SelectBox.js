const SelectBoxComponent = {
  render(selectBoxInformation) {
    this.mounted(selectBoxInformation);
    this.setEvent(selectBoxInformation);
  },

  setEvent(selectBoxInformation) {
    selectBoxInformation.$target.addEventListener('change', selectBoxInformation.eventHandler);
  },

  mounted(selectBoxInformation) {
    selectBoxInformation.$target.insertAdjacentHTML(
      'beforeend',
      `<select name=${selectBoxInformation.attributes.name} id=${selectBoxInformation.attributes.id} class=${selectBoxInformation.attributes.class} ${selectBoxInformation.attributes.required}>
    ${selectBoxInformation.options.map(option => this.getSelectOption(option)).join('')}
</select>`,
    );
  },

  getSelectOption(selectOption) {
    return `<option value=${selectOption.value}>${selectOption.text}</option>`;
  },
};

export default SelectBoxComponent;
