import {
  DESCRIPTION_MAX_LENGTH,
  NAME_MAX_LENGTH,
  SELECT_OPTIONS,
} from "../constants/constants.js";
import { foodItems } from "../mock/mockItem.js";
import { FoodListPage } from "../pages/FoodListPage.js";
import { alertError } from "../util/alertError.js";
import { computeImgSrcAlt } from "../util/computeImgSrcAlt.js";
import { getInput } from "../util/getInput.js";
import { removeError, resetError } from "../util/handleIsError.js";
import { modalClose } from "../util/modalAction.js";
import {
  validateLength,
  validateRequiredInput,
  validateURL,
} from "../validate/validateCondition.js";
import { Alert } from "./Alert.js";
import { Button } from "./Button.js";
import { ButtonContainer } from "./ButtonContainer.js";
import { FoodItem } from "./FoodItem.js";
import { FoodList } from "./FoodList.js";
import { HeaderComponent } from "./HeaderComponent.js";
import { Input } from "./Input.js";
import { SelectInput } from "./SelectInput.js";
import { TextareaInput } from "./TextareaInput.js";

function validateFoodItem({ category, name, distance, description, link }) {
  resetError();
  try {
    validateRequiredInput(category);
    validateRequiredInput(name);
    validateLength(name, NAME_MAX_LENGTH);
    validateRequiredInput(distance);
    validateLength(description, DESCRIPTION_MAX_LENGTH);
    validateURL(link);
  } catch (error) {
    alertError(error.message);
    return;
  }
  return { category, name, distance, description, link };
}

function addFoodItem() {
  const foodInfo = handleSubmit();
  if (!foodInfo) return;

  const prevFoodItems = foodItems;
  const foodList = FoodList({ foodItems: [...prevFoodItems, foodInfo] });

  FoodListPage(foodList);
}

function handleSubmit() {
  const foodInfo = validateFoodItem({
    category: "category",
    name: "name",
    distance: "distance",
    description: "description",
    link: "link",
  });

  if (!foodInfo) return;

  const { imgSrc, imgAlt } = computeImgSrcAlt(foodInfo.category);

  return {
    name: foodInfo.name,
    distance: foodInfo.distance,
    description: foodInfo.description,
    link: foodInfo.link,
    imgSrc: imgSrc,
    imgAlt: imgAlt,
  };
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
        Button({
          cssType: "secondary",
          innerText: "취소하기",
          onClick: modalClose,
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
