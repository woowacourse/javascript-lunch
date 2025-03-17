import { requiredClassName } from "./AddLunchModalForm.js";
import toElement from "../utils/toElement.js";

function SelectForm({ id, label, dropdownList, required }) {
  const $el = toElement(
    ` <div class="form-item" ${requiredClassName(required)}">
            <label for="${id} text-caption">${label}</label>
              <select name=${id} id=${id} ${required ? "required" : ""} >
              ${dropdownList
                .map(
                  ({ label, value }) =>
                    `<option value="${value}">${label}</option>`
                )
                .join("\n")}
              </select>
        </div>
  `
  );

  return $el;
}

export default SelectForm;
