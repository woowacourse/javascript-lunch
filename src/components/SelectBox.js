const SelectBoxComponent = {
  render(selectBoxInformation) {
    this.mounted(selectBoxInformation);
    this.setEvent(selectBoxInformation);
  },

  setEvent(selectBoxInformation) {
    selectBoxInformation.$target.addEventListener('change', selectBoxInformation.eventHandler);
  },

  mounted(selectBoxInformation) {
    const selectBox = document.createElement('select');

    selectBox.setAttribute('name', `${selectBoxInformation.attributes.name}`);
    selectBox.setAttribute('id', `${selectBoxInformation.attributes.id}`);
    selectBox.setAttribute('required', `${selectBoxInformation.attributes.required}`);
    selectBox.classList.add(`${selectBoxInformation.attributes.class}`);

    selectBoxInformation.options.forEach(option => selectBox.appendChild(this.getSelectOption(option)));

    selectBoxInformation.$target.appendChild(selectBox);
  },

  getSelectOption(option) {
    const selectOption = document.createElement('option');

    selectOption.setAttribute('value', `${option.value}`);
    selectOption.textContent = `${option.text}`;

    return selectOption;
  },
};

export default SelectBoxComponent;
