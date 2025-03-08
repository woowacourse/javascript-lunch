import { DOM } from "../utils/dom.js";

const SelectForm = {
  create({ id, label, dropdownList, isRequired }) {
    const SelectFormElement = document.createElement("div");
    SelectFormElement.classList.add("form-item");
    if (isRequired) SelectFormElement.classList.add("form-item--required");

    SelectFormElement.innerHTML = `
            <label for="${id} text-caption">${label}</label>
              <select name=${id} id=${id} ${isRequired ? "required" : ""} >
              ${dropdownList
                .map(
                  ({ label, value }) =>
                    `<option value="${value}">${label}</option>`
                )
                .join("\n")}
              </select>
  `;

    return SelectFormElement;
  },
};

export default SelectForm;
