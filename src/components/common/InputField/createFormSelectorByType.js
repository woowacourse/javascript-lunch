import Input from "../Input";
import Select from "../Select";
import TextArea from "../TextArea";

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
