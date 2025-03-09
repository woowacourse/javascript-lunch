import AddRestaurantModal from "./components/AddRestaurantModal.js";
import Header from "./components/Header.js";
import RestaurantItem from "./components/RestaurantItem.js";
import RestaurantList from "./components/RestaurantList.js";
import RestaurantFilterContainer from "./components/RestaurantFilterContainer.js";
import { categoryMapping } from "./utils/categoryMapping.js";
import {
  validateDescriptiontInput,
  validateNameInput,
  validateSelectInput,
} from "./validation/validator.js";

addEventListener("load", () => {
  const $headerContainer = document.querySelector(".gnb");
  if ($headerContainer) {
    Header($headerContainer);
  } else {
    console.warn("헤더 컨테이너를 DOM에서 찾을 수 없습니다.");
  }

  const $restaurantListContainer = document.querySelector(
    ".restaurant-list-container",
  );
  if ($restaurantListContainer) {
    RestaurantList($restaurantListContainer);
  } else {
    console.warn("레스토랑 리스트 컨테이너를 DOM에서 찾을 수 없습니다.");
  }

  const $filterContainer = document.querySelector(
    ".restaurant-filter-container",
  );
  if ($filterContainer) {
    RestaurantFilterContainer($filterContainer);
  } else {
    console.warn("필터 컨테이너를 DOM에서 찾을 수 없습니다.");
  }

  const $modalButton = document.getElementById("gnb-button");
  const $appContainer = document.getElementById("app");

  if (!$appContainer) {
    console.warn("앱 컨테이너를 DOM에서 찾을 수 없습니다.");
    return;
  }

  if ($modalButton) {
    $modalButton.addEventListener("click", () => {
      AddRestaurantModal($appContainer);

      const $addRestaurantButton = document.querySelector(".button--primary");
      const $closeModalButton = document.getElementById("close-modal");

      if ($addRestaurantButton) {
        $addRestaurantButton.addEventListener("click", (e) => {
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
            const categoryValue = $category.value || "에러";
            const nameValue = $name.value.trim();
            validateNameInput(nameValue);

            const distanceValue = $distance.value || "error_distance";
            validateSelectInput(distanceValue);

            const descriptionValue = $description.value;
            validateDescriptiontInput(descriptionValue);

            const categoryCode = categoryMapping[categoryValue];
            validateSelectInput(categoryCode);

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

          const $modal = document.querySelector(".modal");
          if ($modal) {
            $modal.remove();
          } else {
            console.warn("제거할 모달을 찾을 수 없습니다.");
          }
        });
      } else {
        console.warn("레스토랑 추가 버튼을 DOM에서 찾을 수 없습니다.");
      }

      if ($closeModalButton) {
        $closeModalButton.addEventListener("click", () => {
          const $modal = document.querySelector(".modal");
          if ($modal) {
            $modal.remove();
          } else {
            console.warn("Modal not found for removal");
          }
        });
      } else {
        console.warn("모달 닫기 버튼을 DOM에서 찾을 수 없습니다.");
      }
    });
  } else {
    console.warn("모달 버튼을 DOM에서 찾을 수 없습니다.");
  }
});
