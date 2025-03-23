function SelectField({ name, id = "", options, defaultOption = "", required = false, className = "" }) {
  const selectElement = document.createElement("select");
  selectElement.id = name;
  if (id) selectElement.id = id;
  selectElement.name = name;
  selectElement.required = required;
  if (className) selectElement.classList.add(className);

  if (defaultOption) {
    selectElement.innerHTML = `
    <option value="">${defaultOption}</option>
    ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
    `;
  } else {
    selectElement.innerHTML = options.map((option) => `<option value="${option}">${option}</option>`).join("");
  }

  return selectElement;
}

export default SelectField;
