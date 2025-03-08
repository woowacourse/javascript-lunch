import createButton from "../../button/button.js";
import createDropdownBox from "../../dropdown/dropdown.js";
import createInputBox from "../../input/input.js";
import createTextAreaBox from "../../textarea/textarea.js";
import {
  FOOD_CATEGORY,
  RESTAURANT_DISTANCE,
} from "../../../settings/settings.js";
import { restaurantFormValidation } from "../../../validation/restaurantFormValidation.js";
import { extractFormData } from "../../../utils/extract.js";
import createRestaurantItem from "../item/item.js";
import Toast from "../../Toast/Toast.js";

export default function createRestaurantForm() {
  const restaurantAddForm = createElement("form", {
    className: "restaurant-add-form",
  });

  restaurantAddForm.append(
    createDropdownBox({
      labelText: "카테고리",
      id: "category",
      dropdownList: FOOD_CATEGORY,
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
      dropdownList: RESTAURANT_DISTANCE,
      required: true,
    }),
    createTextAreaBox({
      labelText: "설명",
      id: "description",
      textCaption: "메뉴 등 추가 정보를 입력해 주세요.",
      placeholder: "설명은 300자 이하여야 합니다. 맛있는 설명을 곁들여 주세요!",
    }),
    createInputBox({
      labelText: "참고 링크",
      type: "text",
      id: "link",
      textCaption: "메장 정보를 확인할 수 있는 링크를 입력해 주세요.",
      placeholder: "https://example.com 링크는 300자 이하여야 합니다.",
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
      onclick: () => document.querySelector(".modal").close(),
    }),
    createButton({
      type: "submit",
      className: ["button", "button--primary", "text-caption"],
      textContent: "추가하기",
    })
  );

  restaurantAddForm.appendChild(buttonContainer);

  function handleAddRestaurantFormSubmit(event) {
    event.preventDefault();

    try {
      const formData = extractFormData(restaurantAddForm);
      restaurantFormValidation(formData);
      const restaurantList = document.querySelector(".restaurant-list");
      restaurantList.appendChild(createRestaurantItem(formData));
      restaurantAddForm.reset();
      Toast.showToast(`${formData.name} 음식점을 추가했습니다.`, "success");
      const modal = document.querySelector(".modal");
      modal.close();
    } catch (error) {
      Toast.showToast(`${error.message}`, "error");
    }
  }

  restaurantAddForm.addEventListener("submit", handleAddRestaurantFormSubmit);

  return restaurantAddForm;
}
