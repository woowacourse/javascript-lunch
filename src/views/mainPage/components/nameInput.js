import input from "../../../components/@common/input";
import { $ } from "../../../utils/domHelpers";
import { ERROR } from "../../../constants/messages";

const nameInput = () => {
  const $inputContainer = $(".name-input");

  $inputContainer.innerHTML = `
    ${input({
      id: "name",
      labelText: "이름",
      isRequired: true,
    })}
`;

  $inputContainer.addEventListener("input", (event) => {
    if (event.target.value.length > 20) {
      alert(() => ERROR.INVALID_INPUT_LENGTH(20));
    }
  });

  $inputContainer.addEventListener("change", (event) => {
    if (event.target.value.trim() === "") {
      alert(ERROR.INVALID_EMPTY_INPUT);
      event.target.value = "";
    }
  });

  return $inputContainer;
};

export default nameInput;
