import { $ } from "../../../utils/domHelpers";
import input from "../../../components/@common/input";

const linkInput = () => {
  const $linkInputContainer = $(".link-input");

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
