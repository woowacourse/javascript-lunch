import { categoryMapping } from "../utils/categoryMapping.js";
import {
  validateDescriptiontInput,
  validateNameInput,
  validateSelectInput,
} from "../validation/validator.js";
import removeModal from "../utils/removeModal.js";
import { ERROR_TYPES } from "../constants/errors.js";

export function handleAddRestaurant(e) {
  e.preventDefault();

  const $category = document.getElementById("category");
  const $name = document.getElementById("name");
  const $distance = document.getElementById("distance");
  const $description = document.getElementById("description");

  if (!$category || !$name || !$distance || !$description) {
    alert("필수 입력 필드를 찾을 수 없습니다.");
    return;
  }

  try {
    const categoryValue = $category.value || "";
    const nameValue = $name.value.trim();
    validateNameInput(nameValue);

    const distanceValue = $distance.value || "";
    validateSelectInput(distanceValue, ERROR_TYPES.DISTANCE);

    const descriptionValue = $description.value;
    validateDescriptiontInput(descriptionValue);

    const categoryCode = categoryMapping[categoryValue];
    validateSelectInput(categoryCode, ERROR_TYPES.CATEGORY);

    const inputValue = {
      categoryCode,
      categoryValue,
      nameValue,
      distanceValue,
      descriptionValue,
    };

    console.log(inputValue);

    const $restaurantList = document.querySelector(".restaurant-list");
    if ($restaurantList) {
      // dataset.category 속성을 추가한 HTML을 생성하여 추가
      const restaurantItemHTML = `
        <li class="restaurant" data-category="${categoryCode}">
          <div class="restaurant__category">
            <img src="./category-${categoryCode}.png" alt="${categoryValue}" class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${nameValue}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distanceValue}분 내</span>
            <p class="restaurant__description text-body">${descriptionValue}</p>
          </div>
        </li>
      `;
      $restaurantList.innerHTML += restaurantItemHTML;
    } else {
      console.warn("레스토랑 목록을 DOM에서 찾을 수 없습니다.");
      alert("레스토랑 목록을 찾을 수 없습니다.");
      return;
    }

    removeModal();
  } catch (error) {
    alert(error.message);
  }
}
