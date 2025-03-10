import { LABEL_TEXT } from "../../../constants/labelText";
import { createElement } from "../../../utils/createElement";

const InputField = (infoType, inputElement, text) => {
  const inputField = createElement(/*html*/ `
    <div class="form-item" id=${infoType}-form-item>
      <label for=${infoType} class="text-caption">${LABEL_TEXT[infoType]}</label>
    </div>  
  `);

  const helpText = createElement(/*html*/ `
    <span class="help-text text-caption">${text}</span> 
  `);

  inputField.appendChild(inputElement);

  if (text) inputField.appendChild(helpText);

  return inputField;
};

export default InputField;
