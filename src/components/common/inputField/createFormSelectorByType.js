import Input from "../input";
import Select from "../select";
import TextArea from "../textArea";

const createFormSelectorByType = ({
  inputType,
  infoType,
  required,
  options,
}) => {
  if (inputType === "input") return Input(infoType, required);
  if (inputType === "select") return Select(infoType, required, options);
  if (inputType === "textarea") return TextArea(infoType, required);
};

export default createFormSelectorByType;
