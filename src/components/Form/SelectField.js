function SelectField({ values, name, selectedOption }, isInit = false) {
  const selectElement = document.createElement("select");
  selectElement.id = name;
  selectElement.name = name;
  selectElement.required = true;
  if (selectedOption) {
    selectElement.addEventListener("change", (event) => selectedOption(event));
  }

  selectElement.innerHTML = `
  ${isInit && `<option value="" disabled selected>선택해주세요.</option>`}
  ${values.map((category) => `<option value="${category}">${category}</option>`).join("")}
`;

  return selectElement;
}

export default SelectField;
