import addRequired from "../utils/required.js";
import toElement from "../utils/toElement.js";

function InputForm({ id, label, isRequired, bottomDescription }) {
  const $inputForm = toElement(
    `
        <div class="form-item">
      <label for="${id} text-caption">${label}</label>
      <input type="text" name=${id} id=${id}  ${
      isRequired ? "required" : ""
    }  />
        ${
          bottomDescription === ""
            ? ""
            : `<span class='help-text text-caption'>${bottomDescription}</span>`
        }
        </div>
      `
  );
  addRequired($inputForm, isRequired);

  return $inputForm;
}

export default InputForm;
