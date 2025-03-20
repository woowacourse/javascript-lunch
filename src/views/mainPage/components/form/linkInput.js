import input from "../../../../components/@common/input";
import { ERROR } from "../../../../constants/messages";

const linkInput = () => {
  const $linkInput = input({
    id: "link",
    labelText: "참고 링크",
    spanText: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    maxLength: "300",
    placeholder: "300자 이내로 입력해 주세요.",
  });

  $linkInput.addEventListener("input", (event) => {
    if (event.target.value.length > 300) {
      alert(ERROR.INVALID_INPUT_LENGTH(300));
    }
  });

  return $linkInput;
};

export default linkInput;
