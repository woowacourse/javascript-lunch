import RestaurantItem from "../components/RestaurantItem.js";
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
      nameValue,
      distanceValue,
      descriptionValue,
    };

    const $restaurantList = document.querySelector(".restaurant-list");
    if ($restaurantList) {
      RestaurantItem($restaurantList, inputValue);
    } else {
      console.warn("레스토랑 목록을 DOM에서 찾을 수 없습니다.");
      alert("레스토랑 목록을 찾을 수 없습니다.");
      return;
    }
  } catch (error) {
    alert(error.message);
  }
  removeModal();
}
