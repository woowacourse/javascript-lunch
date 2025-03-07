import { SELECT_OPTIONS } from "../constants/constants.js";
import { CAPTION } from "../constants/systemMessage.js";
import { foodItems } from "../mock/mockItem.js";
import { FoodListPage } from "../pages/FoodListPage.js";
import { removeError, resetError } from "../util/handleIsError.js";
import { modalClose } from "../util/modalAction.js";
import { validateFoodItem } from "../validate/validateFoodItem.js";
import { Button } from "./Button.js";
import { ButtonContainer } from "./ButtonContainer.js";
import { FoodList } from "./FoodList.js";
import { Input } from "./Input.js";
import { SelectInput } from "./SelectInput.js";
import { TextareaInput } from "./TextareaInput.js";

function addFoodItem() {
  const foodInfo = validateFoodItem({
    category: "category",
    name: "name",
    distance: "distance",
    description: "description",
    link: "link",
  });
  if (!foodInfo) return;

  const prevFoodItems = foodItems;
  const foodList = FoodList({ foodItems: [...prevFoodItems, foodInfo] });

  FoodListPage(foodList);
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
