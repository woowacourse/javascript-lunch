import { $ } from "../../../utils/domHelpers";
import textArea from "../../../components/@common/textArea";

const description = () => {
  const $descriptionContainer = $(".description-area");

  $descriptionContainer.innerHTML = `
  ${textArea({
    labelText: "설명",
    id: "description",
    spanText: "메뉴 등 추가 정보를 입력해 주세요.",
  })}
  `;

  return $descriptionContainer;
};

export default description;
