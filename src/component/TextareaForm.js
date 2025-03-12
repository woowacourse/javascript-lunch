import { addRequired } from "./AddLunchModalForm.js";
import toElement from "../utils/toElement.js";

function TextareaForm({ id, bottomDescription, rows, label, required }) {
  const $textareaForm = toElement(
    `
      <div class="form-item">
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
    `
  );
  addRequired($textareaForm, required);

  return $textareaForm;
}

export default TextareaForm;
