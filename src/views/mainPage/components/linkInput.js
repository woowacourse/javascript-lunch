import { $ } from "../../../utils/domHelpers";
import input from "../../../components/@common/input";

const linkInput = () => {
  const $linkInputContainer = $(".link-input");

  $linkInputContainer.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    if (inputValue.length > 1000) {
      alert("1000자 이하로 입력해주세요.");
    }
  });

  $linkInputContainer.innerHTML = `
    ${input({
      id: "link",
      labelText: "참고 링크",
      spanText: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    })}
  `;

  return $linkInputContainer;
};

export default linkInput;
