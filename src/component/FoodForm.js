import { SELECT_OPTIONS } from "../constants/constants.js";
import { CAPTION } from "../constants/systemMessage.js";
import { foodItems } from "../mock/mockItem.js";

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
