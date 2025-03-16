import { SELECT_OPTIONS } from "../../constants/SelectOption.js";

export function SelectBox({ id, name, label, optionName, required, onChange }) {
  const options = SELECT_OPTIONS[optionName] || [];

  function template() {
    return `
      <div class="form-item ${required ? "form-item--required" : ""}">
        ${
          label
            ? `<label for="${id}" class="text-caption">${label}</label>`
            : ""
        }
        <select name="${name}" id="${id}" ${required ? "required" : ""} ${
      onChange ? `data-action="${onChange}"` : ""
    }>
          ${options
            .map(
              (option) => `
                <option value="${option.value}">${option.label}</option>
              `
            )
            .join("")}
        </select>
      </div>
    `;
  }

  return template();
}
