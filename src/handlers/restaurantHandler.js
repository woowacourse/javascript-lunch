import { categoryMapping } from "../utils/categoryMapping.js";
import {
  validateDescriptiontInput,
  validateNameInput,
  validateSelectInput,
} from "../validation/validator.js";
import removeModal from "../utils/removeModal.js";
import { ERROR_TYPES } from "../constants/errors.js";
import RestaurantItem from "../components/RestaurantItem.js";
import { generateId } from "../utils/generateId.js";
import { storeRestaurants } from "../utils/localStorage.js";
import { initialRestaurants } from "../data/initialRestaurants.js";
import { setupRestaurantItemEventListeners } from "./detailModalHandler.js";
import { setupFavoriteEventListeners } from "./favoriteHandler.js";
import { DISTANCE_OPTIONS } from "../constants/options.js";

export function handleDeleteRestaurant(e) {
  e.preventDefault();
  const $restaurantList = document.querySelector(".restaurant-list");
  if ($restaurantList) {
    $restaurantList.innerHTML = "";
  } else {
    console.warn("레스토랑 목록을 DOM에서 찾을 수 없습니다.");
  }
}

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

    const category = categoryMapping[categoryValue];
    validateSelectInput(category, ERROR_TYPES.CATEGORY);

    // 새로운 레스토랑 객체 생성
    const newRestaurant = {
      id: generateId(),
      category,
      categoryName: categoryValue,
      name: nameValue,
      distance: distanceValue,
      description: descriptionValue,
      favorites: false,
    };

    // initialRestaurants 배열에 추가
    initialRestaurants.push(newRestaurant);

    storeRestaurants(initialRestaurants);

    // UI 업데이트
    const $restaurantList = document.querySelector(".restaurant-list");
    if ($restaurantList) {
      const restaurantItemHTML = RestaurantItem(newRestaurant);
      $restaurantList.innerHTML += restaurantItemHTML;

      // 새로 추가된 레스토랑에 이벤트 리스너 설정
      setupRestaurantItemEventListeners();
      setupFavoriteEventListeners();
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
