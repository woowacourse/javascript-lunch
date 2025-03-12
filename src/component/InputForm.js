import { addRequired } from "./AddLunchModalForm.js";
import toElement from "../utils/toElement.js";

function InputForm({ id, label, required, bottomDescription }) {
  const $inputForm = toElement(
    `
        <div class="form-item">
      <label for="${id} text-caption">${label}</label>
      <input type="text" name=${id} id=${id}  ${required ? "required" : ""}  />
        ${
          bottomDescription === ""
            ? ""
            : `<span class='help-text text-caption'>${bottomDescription}</span>`
        }
        </div>
      `
  );
  addRequired($inputForm, required);

  return $inputForm;
}

export default InputForm;
