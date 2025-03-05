import { SELECT_OPTIONS } from "../constants.js";
import { Button } from "./Button.js";
import { ButtonContainer } from "./ButtonContainer.js";
import { Input } from "./Input.js";
import { SelectInput } from "./SelectInput.js";
import { TextareaInput } from "./TextareaInput.js";

export function FoodForm() {
  const container = document.createElement("form");

  container.appendChild(
    SelectInput({
      isRequired: true,
      label: "카데고리",
      optionList: SELECT_OPTIONS.category,
    })
  );

  container.appendChild(
    Input({
      isRequired: true,
      label: "이름",
    })
  );

  container.appendChild(
    SelectInput({
      isRequired: true,
      label: "거리(도보 이동 시간)",
      optionList: SELECT_OPTIONS.distance,
    })
  );

  container.appendChild(
    TextareaInput({
      isRequired: false,
      label: "설명",
      caption: "메뉴 등 추가 정보를 입력해 주세요",
    })
  );

  container.appendChild(
    Input({
      isRequired: false,
      label: "참고 링크",
      caption: "매장 정보를 확인할 수 있는 링크를 입력해 주세요",
    })
  );

  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({ cssType: "secondary", innerText: "취소하기" }),
        Button({ cssType: "primary", innerText: "추가하기" }),
      ],
    })
  );

  return container;
}
