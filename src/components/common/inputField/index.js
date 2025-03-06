import { LABEL_TEXT } from "../../../constants/labelText";

const InputField = (inputElement) => {
  const infoType = inputElement.id;
  const required = inputElement.required;

  const inputField = document.createElement("div");
  inputField.classList.add("form-item");

  if (required) {
    inputField.classList.add("form-item--required");
  }

  const label = document.createElement("label");
  label.setAttribute("for", infoType);
  label.classList.add("text-caption");
  label.textContent = LABEL_TEXT[infoType];

  inputField.appendChild(label);
  inputField.appendChild(inputElement);

  return inputField;
};

export default InputField;
