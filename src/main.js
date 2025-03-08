import AddRestaurantModal from "./components/AddRestaurantModal.js";
import Header from "./components/Header.js";
import { RestaurantItem } from "./components/RestaurantItem.js";
import RestaurantList from "./components/RestaurantList.js";
import { categoryMapping } from "./utils/categoryMapping.js";
import {
  validateDescriptionInput,
  validateNameInput,
  validateSelectInput,
} from "./validation/validator.js";

addEventListener("load", () => {
  const $headerContainer = document.querySelector(".gnb");
  Header($headerContainer);
  const $restaurantListContainer = document.querySelector(
    ".restaurant-list-container"
  );
  RestaurantList($restaurantListContainer);

  const $modalButton = document.getElementById("gnb-button");
  const $appContainer = document.getElementById("app");

  $modalButton.addEventListener("click", () => {
    AddRestaurantModal($appContainer);

    const $addRestaurantButton = document.querySelector(".button--primary");
    $addRestaurantButton.addEventListener("click", (e) => {
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

        RestaurantItem($restaurantList, inputValue);
      } catch (error) {
        alert(error.message);
      }
      const $modal = document.querySelector(".modal");
      $modal.remove();
    });

    const $closeModalButton = document.getElementById("close-modal");
    $closeModalButton.addEventListener("click", () => {
      const $modal = document.querySelector(".modal");
      $modal.remove();
    });
  });
});
