import { LABEL_TEXT } from "../../../constants/labelText";

const InputField = (infoType, inputElement, text) => {
  const inputField = document.createElement("div");
  inputField.classList.add("form-item");
  inputField.id = `${infoType}-form-item`;

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
