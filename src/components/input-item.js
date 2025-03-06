import { categoryOptions, distanceOptions } from "../data/selectOptions";
import $input from "./input";
import $select from "./select";
import $textarea from "./textarea";

const InputItemOptions = {
  categorySelect: {
    label: "카테고리",
    inputType: $select(categoryOptions, "categorySelect"),
  },
  nameInput: {
    label: "이름",
    inputType: $input("nameInput"),
  },
  distanceSelect: {
    label: "거리(도보 이동 시간)",
    inputType: $select(distanceOptions, "distanceSelect"),
  },
  descriptionTextarea: {
    label: "설명",
    inputType: $textarea("descriptionTextarea"),
    helperText: "메뉴 등 추가 정보를 입력해 주세요.",
  },
  linkInput: {
    label: "참고 링크",
    inputType: $input("linkInput"),
    helperText: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
  },
};

const $inputItem = (inputItemName) => {
  const wrapper = document.createElement("div");
  const required = InputItemOptions[inputItemName].inputType.required;
  wrapper.classList.add("form-item");
  if (required) wrapper.classList.add("form-item--required");

  const label = document.createElement("label");
  label.htmlFor = `${InputItemOptions[inputItemName].inputType.id} text-caption`;
  label.innerText = InputItemOptions[inputItemName].label;
  wrapper.appendChild(label);

  wrapper.appendChild(InputItemOptions[inputItemName].inputType);

  if (InputItemOptions[inputItemName].helperText) {
    const helperText = document.createElement("span");
    helperText.classList.add("help-text", "text-caption");
    helperText.innerText = InputItemOptions[inputItemName].helperText;
    wrapper.appendChild(helperText);
  }

  return wrapper;
};

export default $inputItem;