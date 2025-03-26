import { requiredClassName } from "./AddLunchModalForm.js";
import toElement from "../utils/toElement.js";

function TextareaForm({ id, bottomDescription, rows, label, required }) {
  return `
      <div class="form-item" ${requiredClassName(required)}">
        <label for="${id} text-caption" >${label}</label>
        <Textarea
          name=${id}
          id=${id}
          cols="30"
          rows=${rows}
          ${required ? "required" : ""}
        ></Textarea>
        <span class="help-text text-caption"
          >${bottomDescription}</span
        >
      </div>
    `;
}

export default TextareaForm;
