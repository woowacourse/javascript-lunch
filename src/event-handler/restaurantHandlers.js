import { extractFormData } from "../utils/extract";
import { restaurantFormValidation } from "../validation/restaurantFormValidation";
import createRestaurantItem from "../components/restaurant/item/item";
import Toast from "../components/Toast/Toast";
import StorageManager from "../localStorage/StorageManager";
import { STORAGE_KEYS } from "../settings/localStorage";
function toggleRestaurantVisibility(restaurantName, isVisible) {
  const restaurant = document.getElementById(restaurantName);
  if (!restaurant) return;

  restaurant.classList.toggle("hidden", !isVisible);
}

function toggleFavoriteRestaurantByName(restaurantName) {
  const restaurant = document.getElementById(restaurantName);
  if (!restaurant) return;
  const favoriteIcon = restaurant.querySelector(".favorite-icon");
  const descriptionFavorite = document.getElementById("description-favorite");

  if (favoriteIcon.src.includes("Un-star.png")) {
    favoriteIcon.src = "Star.png";
  } else {
    favoriteIcon.src = "Un-star.png";
  }
  if (!descriptionFavorite) return;
  if (descriptionFavorite.src.includes("Un-star.png")) {
    descriptionFavorite.src = "Star.png";
  } else {
    descriptionFavorite.src = "Un-star.png";
  }
}
export function handleFavoriteToggle(
  event,
  restaurantList,
  restaurantListElement
) {
  if (!event.target.classList.contains("favorite-icon")) return;

  const parent = event.target.parentElement;
  const name = parent.querySelector(".restaurant__name").textContent;
  const restaurant = restaurantList.searchRestaurant(name);
  if (!restaurant) return;

  restaurantList.toggleFavoriteRestaurant(restaurant);
  StorageManager.setItem(STORAGE_KEYS.RESTAURANT_LIST, restaurantList.List);
  toggleFavoriteRestaurantByName(name);

  const isFavoriteFilterOn =
    document.querySelector('input[name="favoriteFilter"]:checked').value ===
    "favorite";

  if (isFavoriteFilterOn) {
    toggleRestaurantVisibility(name, restaurant.isFavorite);
  }
}

function deleteRestaurantElementByName(restaurantName) {
  const restaurant = document.getElementById(restaurantName);
  restaurant.remove();
}

export function handleAddRestaurantFormSubmit(
  event,
  restaurantList,
  restaurantAddForm
) {
  event.preventDefault();

  try {
    const restaurantForm = extractFormData(restaurantAddForm);

    // 만약 레스토랑이 Invalid 하다면(글자수 제한, 중복등) 이 라인에서 함수 실행은 종료됩니다.
    const restaurant = restaurantFormValidation(restaurantForm);

    addRestaurantToList(restaurantList, restaurant);
    updateRestaurantListUI(restaurant, restaurantForm);

    Toast.showToast(`${restaurant.name} 음식점을 추가했습니다.`, "success");
    closeModal(document.querySelector(".form-modal"));
    restaurantAddForm.reset();
  } catch (error) {
    Toast.showToast(`${error.message}`, "error");
  }
}

function addRestaurantToList(restaurantList, restaurant) {
  restaurantList.addRestaurant(restaurant);
  StorageManager.setItem(STORAGE_KEYS.RESTAURANT_LIST, restaurantList.List);
}

function updateRestaurantListUI(restaurant, restaurantForm) {
  const restaurantListElement = document.querySelector(".restaurant-list");
  const isFavoriteFilterOn =
    document.querySelector('input[name="favoriteFilter"]:checked').value ===
    "favorite";

  if (!isFavoriteFilterOn) {
    restaurantListElement.appendChild(createRestaurantItem(restaurantForm));
  }
}

function closeModal(modal) {
  if (modal) {
    modal.close();
  }
}

export function handleDeleteRestaurant(
  event,
  restaurantList,
  restaurantListElement
) {
  try {
    const parent = event.target.parentElement.parentElement;
    const name = parent.querySelector(".restaurant__name").textContent;

    restaurantList.deleteRestaurant(name);

    StorageManager.setItem(STORAGE_KEYS.RESTAURANT_LIST, restaurantList.List);

    deleteRestaurantElementByName(name);

    const descriptionModal = document.querySelector(".description-modal");

    descriptionModal.close();
    Toast.showToast(`${name} 레스토랑을 삭제했습니다.`, "success");
  } catch (error) {
    Toast.showToast(`${error.message}`, "error");
  }
}
