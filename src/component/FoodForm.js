import { CAPTION } from "../constants/systemMessage.js";
import { removeError } from "../util/errorHandler.js";
import { validateFoodItem } from "../validate/validateFoodItem.js";
import { Button } from "./button/Button.js";
import { ButtonContainer } from "./button/ButtonContainer.js";
import { FoodItem } from "./FoodItem.js";
import { FoodList } from "./FoodList.js";
import { Input } from "./input/Input.js";
import { SelectInput } from "./input/SelectInput.js";
import { TextareaInput } from "./input/TextareaInput.js";
import { Modal } from "./layout/Modal.js";

const SELECT_OPTIONS = {
  category: [
    { value: "한식", label: "한식" },
    { value: "중식", label: "중식" },
    { value: "일식", label: "일식" },
    { value: "양식", label: "양식" },
    { value: "아시안", label: "아시안" },
    { value: "기타", label: "기타" },
  ],
  distance: [
    { value: "5", label: "5분 내" },
    { value: "10", label: "10분 내" },
    { value: "15", label: "15분 내" },
    { value: "20", label: "20분 내" },
    { value: "30", label: "30분 내" },
  ],
};

function addFoodItem() {
  const foodItem = new FoodItem();
  const foodInfo = foodItem.getFoodItem();
  if (!foodInfo) return;

  const foodList = new FoodList();
  foodList.updateFoodList(foodInfo);
  Modal.close();
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
      caption: CAPTION.description,
      name: "description",
    })
  );

  container.appendChild(
    Input({
      isRequired: false,
      label: "참고 링크",
      name: "link",
      caption: CAPTION.link,
    })
  );

  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({
          cssType: "secondary",
          innerText: "취소하기",
          onClick: Modal.close,
        }),
        Button({
          cssType: "primary",
          innerText: "추가하기",
          onClick: addFoodItem,
        }),
      ],
    })
  );

  return container;
}
