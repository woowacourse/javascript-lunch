import { DOM } from "../../utils/dom.js";

const SelectForm = {
  render(props, dom) {
    const SelectFormElement = createSelectForm(props);
    dom.append(SelectFormElement);
  },
};

function createSelectForm({ label, dropdownList, isRequired }) {
  const SelectFormElement = document.createElement("div");
  SelectFormElement.classList.add("form-item");
  if (isRequired) SelectFormElement.classList.add("form-item--required");

  SelectFormElement.innerHTML = `
            <label for="category text-caption">${label}</label>
              <select name="category" id="category" ${
                isRequired ? "required" : ""
              } >
              ${dropdownList
                .map(
                  ({ label, value }) =>
                    `<option value="${value}">${label}</option>`
                )
                .join("\n")}
              </select>
  `;

  return SelectFormElement;
}

export default SelectForm;
