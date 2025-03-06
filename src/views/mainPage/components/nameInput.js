import input from "../../../components/@common/input";
import { $ } from "../../../utils/domHelpers";

const nameInput = () => {
  const $inputContainer = $(".name-input");

  $inputContainer.innerHTML = `
    ${input({
      id: "name",
      labelText: "이름",
      isRequired: true,
    })}
`;

  return $inputContainer;
};

export default nameInput;
