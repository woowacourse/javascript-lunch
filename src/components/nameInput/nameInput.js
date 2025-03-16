import input from "../@common/input";
import { $ } from "../../utils/domHelpers";
import { ERROR } from "../../constants/messages";

const nameInput = () => {
  const $inputContainer = $(".name-input");

  $inputContainer.innerHTML = `
    ${input({
      id: "name",
      labelText: "이름",
      isRequired: true,
      onChange: validateLength,
      onInput: validateEmpty,
    })}
`;

  const validateLength = (event) => {
    if (event.target.value.length > 20) {
      alert(() => ERROR.INVALID_INPUT_LENGTH(20));
    }
  };

  const validateEmpty = (event) => {
    if (event.target.value.value.trim() === "") {
      alert(ERROR.INVALID_EMPTY_INPUT);
      event.target.value = "";
    }
  };

  $inputContainer.addEventListener("change", validateLength);
  $inputContainer.addEventListener("input", validateEmpty);

  return $inputContainer;
};

export default nameInput;
