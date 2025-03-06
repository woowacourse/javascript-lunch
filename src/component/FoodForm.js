import {
  DESCRIPTION_MAX_LENGTH,
  NAME_MAX_LENGTH,
  SELECT_OPTIONS,
} from "../constants/constants.js";
import { alertError } from "../util/alertError.js";
import {
  validateDescriptionLength,
  validateLength,
  validateNameLength,
  validateRequiredInput,
  validateURL,
} from "../validate/validateCondition.js";
import { Alert } from "./Alert.js";
import { Button } from "./Button.js";
import { ButtonContainer } from "./ButtonContainer.js";
import { Input } from "./Input.js";
import { SelectInput } from "./SelectInput.js";
import { TextareaInput } from "./TextareaInput.js";

function getInput(name, validateFuncs) {
  const value = document.querySelector(`[name=${name}]`).value;
  validateFuncs.forEach((validateFunc) => {
    return alertError(() => validateFunc(value));
  });
  return value;
}

function handleSubmit() {
  const category = getInput("category", [validateRequiredInput]);
  const name = getInput("name", [validateRequiredInput, validateNameLength]);
  const distance = getInput("distance", [validateRequiredInput]);
  const description = getInput("description", [validateDescriptionLength]);
  const link = getInput("link", [validateURL]);
}

export function FoodForm() {
  const container = document.createElement("form");

  container.appendChild(
    SelectInput({
      isRequired: true,
      name: "category",
      label: "카테고리",
      optionList: SELECT_OPTIONS.category,
    })
  );

  container.appendChild(
    Input({
      isRequired: true,
      name: "name",
      label: "이름",
    })
  );

  container.appendChild(
    SelectInput({
      isRequired: true,
      name: "distance",
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
      name: "link",
      caption: "매장 정보를 확인할 수 있는 링크를 입력해 주세요",
    })
  );

  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({ cssType: "secondary", innerText: "취소하기" }),
        Button({
          cssType: "primary",
          innerText: "추가하기",
          onClick: handleSubmit,
        }),
      ],
    })
  );

  return container;
}
