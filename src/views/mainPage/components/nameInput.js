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

  $inputContainer.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    if (inputValue.length > 20) {
      alert("20자 이하로 입력해주세요.");
    }
  });

  $inputContainer.addEventListener("change", (event) => {
    if (event.target.value.trim() === "") {
      alert("공백은 입력할 수 없습니다.");
      event.target.value = "";
    }
  });

  return $inputContainer;
};

export default nameInput;
