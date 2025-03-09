import addRequired from "../utils/required.js";
import toElement from "../utils/toElement.js";

function SelectForm({ id, label, dropdownList, isRequired }) {
  const $selectForm = toElement(
    ` <div class="form-item">
            <label for="${id} text-caption">${label}</label>
              <select name=${id} id=${id} ${isRequired ? "required" : ""} >
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
  addRequired($selectForm, isRequired);

  return $selectForm;
}

export default SelectForm;
