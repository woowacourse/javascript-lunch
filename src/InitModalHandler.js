import AddRestaurantModal from "./components/AddRestaurantModal";
import { createRestaurantItem } from "./components/createRestaurantItem";
import { categoryMapping } from "./utils/categoryMapping";
import {
  validateDescriptionInput,
  validateNameInput,
  validateSelectInput,
} from "./validation/validator";

export default function InitModalHandler() {
  const $modalButton = document.getElementById("gnb-button");
  const $appContainer = document.getElementById("app");

  $modalButton.addEventListener("click", () => {
    AddRestaurantModal($appContainer);
    InitModalEvents();
  });
}

function InitModalEvents() {
  const $addRestaurantButton = document.querySelector(".button--primary");
  const $closeModalButton = document.getElementById("close-modal");

  $addRestaurantButton.addEventListener("click", HandleAddRestaurant);

  $closeModalButton.addEventListener("click", CloseModal);
}

function HandleAddRestaurant(e) {
  e.preventDefault();

  const $category = document.getElementById("category");
  const $name = document.getElementById("name");
  const $distance = document.getElementById("distance");
  const $description = document.getElementById("description");

  try {
    const categoryValue = $category.value || "에러";
    const nameValue = $name.value.trim();
    validateNameInput(nameValue);
    const distanceValue = $distance.value || "error_distance";
    validateSelectInput(distanceValue);
    const descriptionValue = $description.value;
    validateDescriptionInput(descriptionValue);
    const categoryCode = categoryMapping[categoryValue];
    validateSelectInput(categoryCode);

    const inputValue = {
      categoryCode,
      nameValue,
      distanceValue,
      descriptionValue,
    };

    const $restaurantList = document.querySelector(".restaurant-list");
    createRestaurantItem($restaurantList, inputValue);

    CloseModal();
  } catch (error) {
    alert(error.message);
  }
}

function CloseModal() {
  const $modal = document.querySelector(".modal");
  if ($modal) {
    $modal.remove();
  }
}
