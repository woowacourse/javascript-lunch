import { requiredClassName } from "./AddLunchModalForm.js";
import toElement from "../utils/toElement.js";

function InputForm({ id, label, required, bottomDescription }) {
  return `
      <div class="form-item" ${requiredClassName(required)}">
      <label for="${id} text-caption">${label}</label>
      <input type="text" name=${id} id=${id}  ${required ? "required" : ""}  />
        ${
          bottomDescription === ""
            ? ""
            : `<span class='help-text text-caption'>${bottomDescription}</span>`
        }
      </div>
      `;
}

export default InputForm;
