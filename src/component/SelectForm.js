import { requiredClassName } from "./AddLunchModalForm.js";
import toElement from "../utils/toElement.js";

function SelectForm({ id, label, dropdownList, required }) {
  return ` <div class="form-item" ${requiredClassName(required)}">
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
  `;
}

export default SelectForm;
