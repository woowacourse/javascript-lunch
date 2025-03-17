function SelectField({ values, name, selectedOption }) {
  const selectElement = document.createElement("select");
  selectElement.id = name;
  selectElement.name = name;
  selectElement.required = true;
  if (selectedOption) {
    selectElement.addEventListener("change", (event) => selectedOption(event));
  }

  selectElement.innerHTML = `
    ${values.map((category) => `<option value="${category}">${category}</option>`).join("")}
    `;

  return selectElement;
}

export default SelectField;
