import AddRestaurantModal from "./components/AddRestaurantModal";
import { AddNewRestaurant } from "./domain/RestaurantStorage";
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
  const $link = document.getElementById("link");

  try {
    const categoryValue = $category.value;
    validateSelectInput(categoryValue, "카테고리");
    const nameValue = $name.value.trim();
    validateNameInput(nameValue);
    const distanceValue = $distance.value;
    validateSelectInput(distanceValue, "거리");
    const descriptionValue = $description.value;
    validateDescriptionInput(descriptionValue);
    const category = categoryMapping[categoryValue];
    const link = $link.value;

    const inputValue = {
      category,
      categoryValue,
      nameValue,
      distanceValue,
      descriptionValue,
      link,
      favorite: false,
    };

    const $restaurantList = document.querySelector(".restaurant-list");
    AddNewRestaurant({ restaurant: inputValue });

    location.reload();

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
