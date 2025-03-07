import { LABEL_TEXT } from "../../../constants/labelText";

const InputField = (inputElement, text) => {
  const infoType = inputElement.id;
  const required = inputElement.required;

  const inputField = document.createElement("div");
  inputField.classList.add("form-item");
  inputField.id = `${infoType}-form-item`;

  if (required) inputField.classList.add("form-item--required");

  const label = document.createElement("label");
  label.setAttribute("for", infoType);
  label.classList.add("text-caption");
  label.textContent = LABEL_TEXT[infoType];

  const helpText = document.createElement("span");
  helpText.classList.add("help-text", "text-caption");
  helpText.textContent = text;

  inputField.appendChild(label);
  inputField.appendChild(inputElement);

  if (text) inputField.appendChild(helpText);

  return inputField;
};

export default InputField;
