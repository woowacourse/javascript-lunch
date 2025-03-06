import { LABEL_TEXT } from "../../constants/labelText";
import Input from "../input";

const InputField = (infoType, inputElement) => {
  const inputField = document.createElement("div");
  inputField.classList.add("form-item", "form-item--required");

  const label = document.createElement("label");
  label.setAttribute("for", infoType);
  label.classList.add("text-caption");
  label.textContent = LABEL_TEXT[infoType];

  inputField.appendChild(label);
  inputField.appendChild(inputElement);

  return inputField;
};

export default InputField;
