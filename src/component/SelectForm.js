import { addRequired } from "./AddLunchModalForm.js";
import toElement from "../utils/toElement.js";

function SelectForm({ id, label, dropdownList, required }) {
  const $selectForm = toElement(
    ` <div class="form-item">
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
  addRequired($selectForm, required);

  return $selectForm;
}

export default SelectForm;
