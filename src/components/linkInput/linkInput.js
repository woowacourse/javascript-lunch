import { $ } from "../../utils/domHelpers";
import input from "../@common/input";
import { ERROR } from "../../constants/messages";

const linkInput = () => {
  const $linkInputContainer = $(".link-input");

  $linkInputContainer.innerHTML = `
  ${input({
    id: "link",
    labelText: "참고 링크",
    spanText: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    onInput: validateLength,
  })}
    `;

  const validateLength = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length > 300) {
      alert(() => ERROR.INVALID_INPUT_LENGTH(300));
    }
  };

  return $linkInputContainer;
};

export default linkInput;
