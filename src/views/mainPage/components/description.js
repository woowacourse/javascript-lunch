import { $ } from "../../../utils/domHelpers";
import textArea from "../../../components/@common/textArea";

const description = () => {
  const $descriptionContainer = $(".description-area");

  $descriptionContainer.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    if (inputValue > 1000) {
      alert("1000자 이하로 입력해주세요.");
    }
    if (inputValue.trim().length === 0) {
      alert("공백은 입력할 수 없습니다.");
    }
  });

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
