// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getSelectOption = selectOption => {
  return `<option value=${selectOption.value}>${selectOption.text}</option>`;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const SelectBoxComponent = (select, options) => {
  return `<select name=${select.name} id=${select.id} class="restaurant-filter">
        ${options.map(option => getSelectOption(option)).join('')}
</select>`;
};

export default SelectBoxComponent;
