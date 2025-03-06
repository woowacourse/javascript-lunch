import {
  DESCRIPTION_MAX_LENGTH,
  NAME_MAX_LENGTH,
  SELECT_OPTIONS,
} from "../constants/constants.js";
import { foodItems } from "../mock/foodItems.js";
import { FoodListPage } from "../pages/FoodListPage.js";
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
import { FoodItem } from "./FoodItem.js";
import { FoodList } from "./FoodList.js";
import { HeaderComponent } from "./HeaderComponent.js";
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

function computeImgSrcAlt(category) {
  switch (category) {
    case "한식":
      return { imgAlt: "한식", imgSrc: "/category-korean.png" };
    case "중식":
      return { imgAlt: "중식", imgSrc: "/category-chinese.png" };
    case "일식":
      return { imgAlt: "일식", imgSrc: "/category-japanese.png" };
    case "양식":
      return { imgAlt: "양식", imgSrc: "/category-western.png" };
    case "아시안":
      return { imgAlt: "아시안", imgSrc: "/category-asian.png" };
    default:
      return { imgAlt: "기타", imgSrc: "/category-etc.png" };
  }
}

function addFoodItem() {
  const foodInfo = handleSubmit();
  const prevFoodItems = foodItems;
  const foodList = FoodList({ foodItems: [...prevFoodItems, foodInfo] });

  FoodListPage(foodList);
}

function handleSubmit() {
  const category = getInput("category", [validateRequiredInput]);
  const name = getInput("name", [validateRequiredInput, validateNameLength]);
  const distance = getInput("distance", [validateRequiredInput]);
  const description = getInput("description", [validateDescriptionLength]);
  const link = getInput("link", [validateURL]);

  const { imgSrc, imgAlt } = computeImgSrcAlt(category);

  return {
    imgSrc: imgSrc,
    imgAlt: imgAlt,
    name: name,
    distance: distance,
    description: description,
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
        Button({ cssType: "secondary", innerText: "취소하기" }),
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
