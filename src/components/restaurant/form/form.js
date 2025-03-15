import createButton from "../../button/button.js";
import createDropdownBox from "../../dropdown/dropdown.js";
import createInputBox from "../../input/input.js";
import createTextAreaBox from "../../textarea/textarea.js";
import {
  FOOD_CATEGORY_VALUES,
  RESTAURANT_DISTANCE_VALUES,
} from "../../../settings/settings.ts";
import { restaurantFormValidation } from "../../../validation/restaurantFormValidation.ts";

import createRestaurantItem from "../item/item.js";
import Toast from "../../Toast/Toast.js";
import { createElement } from "../../../utils/dom.ts";
import { RESTAURANT_FIELD_LENGTH } from "../../../settings/settings.ts";

export default function createRestaurantForm(restaurantList) {
  const restaurantAddForm = createElement("form", {
    className: "restaurant-add-form",
    id: "restaurant-add-form",
  });

  restaurantAddForm.append(
    createDropdownBox({
      labelText: "카테고리",
      id: "category",
      dropdownList: FOOD_CATEGORY_VALUES,
      required: true,
    }),
    createInputBox({
      labelText: "이름",
      required: true,
      type: "text",
      id: "name",
      placeholder: "음식점 이름(12자 이하)",
    }),
    createDropdownBox({
      labelText: "거리(도보 이동 시간)",
      id: "distance",
      dropdownList: RESTAURANT_DISTANCE_VALUES,
      required: true,
    }),
    createTextAreaBox({
      labelText: "설명",
      id: "description",
      textCaption: "메뉴 등 추가 정보를 입력해 주세요.",
      placeholder: `설명은 ${RESTAURANT_FIELD_LENGTH.name.max}자 이하여야 합니다. 맛있는 설명을 곁들여 주세요!`,
    }),
    createInputBox({
      labelText: "참고 링크",
      type: "text",
      id: "link",
      textCaption: "메장 정보를 확인할 수 있는 링크를 입력해 주세요.",
      placeholder: `https://example.com 링크는 ${RESTAURANT_FIELD_LENGTH.link.max}자 이하여야 합니다.`,
    })
  );

  const buttonContainer = createElement("div", {
    className: "button-container",
  });

  buttonContainer.append(
    createButton({
      type: "button",
      className: [
        "button",
        "button--secondary",
        "text-caption",
        "cancel-button",
      ],
      textContent: "취소하기",
      onclick: () => document.querySelector(".form-modal").close(),
    }),
    createButton({
      type: "submit",
      className: ["button", "button--primary", "text-caption"],
      textContent: "추가하기",
    })
  );

  restaurantAddForm.appendChild(buttonContainer);

  return restaurantAddForm;
}
