import {
  validateDescriptiontInput,
  validateNameInput,
  validateSelectInput,
} from "../validation/validator.js";
import removeModal from "../utils/removeModal.js";
import { ERROR_TYPES } from "../constants/errors.js";
import RestaurantItem from "../components/RestaurantItem.js";
import { generateId } from "../utils/generateId.js";
import { restaurantStore } from "../store/restaurantStore.ts";
import { setupRestaurantItemEventListeners } from "./detailModalHandler.ts";
import { setupFavoriteEventListeners } from "./favoriteHandler.ts";
import { categoryMapping } from "../utils/categoryMapping.ts";
import { Restaurant, Category, CategoryName } from "../../types/Restaurant.ts";

export function handleDeleteRestaurant(e: MouseEvent): void {
  e.preventDefault();
  const $restaurantList = document.querySelector(".restaurant-list");
  const $restaurantItems = $restaurantList?.querySelectorAll<HTMLElement>(".restaurant");
  const selectedId = (e.currentTarget as HTMLElement).closest('.modal')?.querySelector<HTMLElement>('.restaurant')?.dataset.restaurantId;

  if ($restaurantItems && selectedId) {
    $restaurantItems.forEach((item) => {
      if (item.dataset.restaurantId === selectedId) {
        item.remove();
      }
    });

    // restaurantStore에서 레스토랑 제거
    restaurantStore.deleteRestaurant(selectedId);
  } else {
    console.warn("레스토랑 목록이나 선택된 레스토랑을 찾을 수 없습니다.");
  }
}

export function handleAddRestaurant(e: MouseEvent): void {
  e.preventDefault();

  const $category = document.getElementById("category") as HTMLSelectElement;
  const $name = document.getElementById("name") as HTMLInputElement;
  const $distance = document.getElementById("distance") as HTMLSelectElement;
  const $description = document.getElementById("description") as HTMLTextAreaElement;

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

    const category = categoryMapping[categoryValue as keyof typeof categoryMapping];
    validateSelectInput(category, ERROR_TYPES.CATEGORY);

    // 새로운 레스토랑 객체 생성
    const newRestaurant: Restaurant = {
      id: generateId(),
      category: category as Category,
      categoryName: categoryValue as CategoryName,
      name: nameValue,
      distance: distanceValue,
      description: descriptionValue,
      favorites: false,
    };

    // restaurantStore에 추가
    restaurantStore.addRestaurant(newRestaurant);

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
    alert((error as Error).message);
  }
}

export function rerenderRestaurantList(restaurantId: string): void {
  const $restaurantList = document.querySelector(".restaurant-list");
  if (!$restaurantList) return;
  
  const restaurants = restaurantStore.getRestaurants();
  const visibleItems = restaurants.filter(restaurant => {
    // TODO : 필터조건 추가 구현
    return true;
  });
  
  $restaurantList.innerHTML = visibleItems.map(restaurant => 
    RestaurantItem(restaurant)
  ).join("");
  
  setupRestaurantItemEventListeners();
  setupFavoriteEventListeners();
}