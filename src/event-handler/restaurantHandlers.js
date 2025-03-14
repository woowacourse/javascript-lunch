import { extractFormData } from "../utils/extract";
import { restaurantFormValidation } from "../validation/restaurantFormValidation";
import createRestaurantItem from "../components/restaurant/item/item";
import Toast from "../components/Toast/Toast";
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
  localStorage.setItem("restaurantList", JSON.stringify(restaurantList.List));
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

export function handleDeleteRestaurant(
  event,
  restaurantList,
  restaurantListElement
) {
  try {
    const parent = event.target.parentElement.parentElement;
    const name = parent.querySelector(".restaurant__name").textContent;

    restaurantList.deleteRestaurant(name);

    localStorage.setItem("restaurantList", JSON.stringify(restaurantList.List));

    deleteRestaurantElementByName(name);

    const descriptionModal = document.querySelector(".description-modal");

    descriptionModal.close();
    Toast.showToast(`${name} 레스토랑을 삭제했습니다.`, "success");
  } catch (error) {
    Toast.showToast(`${error.message}`, "error");
  }
}
