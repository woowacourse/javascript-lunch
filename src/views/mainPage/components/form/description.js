import textArea from "../../../../components/@common/textArea";
import { ERROR } from "../../../../constants/messages";

const description = () => {
  const $description = textArea({
    labelText: "설명",
    id: "description",
    spanText: "메뉴 등 추가 정보를 입력해 주세요.",
    placeholder: "1000자 이내로 입력해 주세요.",
  });

  $description.addEventListener("input", (event) => {
    if (event.target.value.length > 1000) {
      alert(ERROR.INVALID_INPUT_LENGTH(1000));
    }
  });

  return $description;
};

export default description;
