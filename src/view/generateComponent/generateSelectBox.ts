const generateSelectBoxOption = (options: string[]) => {
  return options.map((option) => {
    const optionElement = document.createElement("option");

    optionElement.innerText = option;
    optionElement.value = option;

    return optionElement;
  });
};

const generateSelectBox = (
  options: string[],
  hasDefaultOption: boolean = true
) => {
  const selectElement = document.createElement("select");
  selectElement.classList.add("select-box", "restaurant-filter");

  const optionElements = generateSelectBoxOption(options);
  if (!hasDefaultOption) {
    const defaultOption = generateSelectBoxOption(["선택해주세요"])[0];
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.value = "";
    selectElement.append(defaultOption);
  }

  selectElement.append(...optionElements);

  return selectElement;
};

export default generateSelectBox;
