import Input from "../Input";
import Select from "../Select";
import TextArea from "../TextArea";

const SELECT_PLACEHOLDER = "선택해주세요.";

const createFormElementByType = ({
  inputType,
  infoType,
  required,
  options,
}) => {
  if (inputType === "input") return Input(infoType, required);
  if (inputType === "select")
    return Select({
      name: infoType,
      required,
      options,
      defaultOptionText: SELECT_PLACEHOLDER,
    });
  if (inputType === "textarea") return TextArea(infoType, required);
};

export default createFormElementByType;
