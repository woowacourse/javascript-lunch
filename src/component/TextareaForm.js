import addRequired from "../utils/required.js";
import toElement from "../utils/toElement.js";

function TextareaForm({ id, bottomDescription, rows, label, isRequired }) {
  const $textareaForm = toElement(
    `
      <div class="form-item">
        <label for="${id} text-caption" >${label}</label>
        <Textarea
          name=${id}
          id=${id}
          cols="30"
          rows=${rows}
          ${isRequired ? "required" : ""}
        ></Textarea>
        <span class="help-text text-caption"
          >${bottomDescription}</span
        >
      </div>
    `
  );
  addRequired($textareaForm, isRequired);

  return $textareaForm;
}

export default TextareaForm;
