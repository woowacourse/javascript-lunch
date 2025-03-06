import { LABEL_TEXT } from "../../constants/labelText";
import Input from "../input";

const InputField = ({ infoType, required }) => {
  const inputField = document.createElement("div");
  const label = document.createElement("label");

  label.setAttribute("for", infoType);
  label.setAttribute("for", "text-caption");
  label.textContent(LABEL_TEXT[infoType]);

  inputField.appendChild(label);
  inputField.appendChild(Input({ name: infoType, required }));

  return inputField;
};

export default InputField;
