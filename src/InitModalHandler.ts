import { AddNewRestaurant } from "./domain/RestaurantStorage";
import { categoryMapping } from "./utils/categoryMapping";
import {
  validateDescriptionInput,
  validateNameInput,
  validateSelectInput,
} from "./validation/validator";
import AddRestaurantModal from "./view/AddRestaurantModal";

export default function InitModalHandler() {
  const $modalButton = document.getElementById(
    "gnb-button"
  ) as HTMLButtonElement;
  const $appContainer = document.getElementById("app") as HTMLElement;

  $modalButton.addEventListener("click", () => {
    AddRestaurantModal($appContainer);
    InitModalEvents();
  });
}

function InitModalEvents() {
  const $addRestaurantButton = document.querySelector(
    ".button--primary"
  ) as HTMLButtonElement;
  const $closeModalButton = document.getElementById(
    "close-modal"
  ) as HTMLButtonElement;

  $addRestaurantButton.addEventListener("click", HandleAddRestaurant);

  $closeModalButton.addEventListener("click", CloseModal);
}

function HandleAddRestaurant(e: Event) {
  e.preventDefault();

  const $category = document.getElementById("category") as HTMLSelectElement;
  const $name = document.getElementById("name") as HTMLInputElement;
  const $distance = document.getElementById("distance") as HTMLSelectElement;
  const $description = document.getElementById(
    "description"
  ) as HTMLTextAreaElement;
  const $link = document.getElementById("link") as HTMLInputElement;

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
      distanceValue: Number(distanceValue),
      descriptionValue,
      link,
      favorite: false,
    };

    AddNewRestaurant({ restaurant: inputValue });

    location.reload();

    CloseModal();
  } catch (error) {
    if (error instanceof Error) {
      alert(
        error.message ||
          "알 수 없는 오류로 인해 새로운 음식점 추가를 실패했습니다."
      );
    }
  }
}

function CloseModal() {
  const $modal = document.querySelector(".modal");
  if ($modal) {
    $modal.remove();
  }
}
