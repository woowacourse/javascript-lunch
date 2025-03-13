import { extractFormData } from "../utils/extract";
import { restaurantFormValidation } from "../validation/restaurantFormValidation";
import createRestaurantItem from "../components/restaurant/item/item";
import Toast from "../components/Toast/Toast";
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

  localStorage.setItem("restaurantList", JSON.stringify(restaurantList.List));

  if (
    !restaurant.isFavorite &&
    document.querySelector('input[name="favoriteFilter"]:checked').value ===
      "favorite"
  ) {
    restaurantListElement.removeChild(parent.parentElement.parentElement);
  }

  event.target.src = restaurant.isFavorite ? "./Star.png" : "./Un-star.png";
}

// 음식점 추가 폼 제출 처리
export function handleAddRestaurantFormSubmit(
  event,
  restaurantList,
  restaurantAddForm
) {
  event.preventDefault();

  try {
    console.log(restaurantAddForm);
    const restaurantForm = extractFormData(restaurantAddForm);

    const restaurant = restaurantFormValidation(restaurantForm);
    const restaurantListElement = document.querySelector(".restaurant-list");

    restaurantList.addRestaurant(restaurant);

    localStorage.setItem("restaurantList", JSON.stringify(restaurantList.List));
    restaurantListElement.appendChild(createRestaurantItem(restaurantForm));

    Toast.showToast(`${restaurant.name} 음식점을 추가했습니다.`, "success");
    const formModal = document.querySelector(".form-modal");
    restaurantAddForm.reset();
    formModal.close();
  } catch (error) {
    Toast.showToast(`${error.message}`, "error");
  }
}
