import handleFormModalToggle from "../event-handler/modal/handleFormModalToggle.js";
import handleDescriptionModalToggle from "../event-handler/modal/handleDescriptionModalToggle.js";
import {
  handleAddRestaurantFormSubmit,
  handleDeleteRestaurant,
  handleFavoriteToggle,
} from "../event-handler/restaurantHandlers.js";

import {
  handleSort,
  handleCombinedFilter,
} from "../event-handler/sortFilterHandlers.js";
import type { AppState } from "../../types/restaurantTypes.js";

// 미리 DOM 요소를 선택합니다.
const formModal = document.querySelector(".form-modal");
const descriptionModal = document.querySelector(".description-modal");
const descriptionContainer = document.querySelector(".description");

export default function bindEventHandlers({
  restaurantList,
  restaurantListElement,
  restaurantAddForm,
}: AppState) {
  document.body.addEventListener("click", (event) => {
    const target = event.target;

    if (target.closest("#delete-button")) {
      handleDeleteRestaurant(event, restaurantList, restaurantListElement);
    }

    // 캐시된 요소들을 인자로 전달합니다.
    handleFormModalToggle(event, formModal);
    handleDescriptionModalToggle(event, restaurantList, {
      modal: descriptionModal,
      container: descriptionContainer,
    });
    handleFavoriteToggle(event, restaurantList, restaurantListElement);
  });

  const filterElements = document.querySelectorAll(
    "#category-filter, #favorite-filter"
  );

  filterElements.forEach((el) => {
    el.addEventListener("change", (event) => {
      handleCombinedFilter(event, restaurantListElement, restaurantList);
    });
  });

  const sortingFilter = document.getElementById(
    "sorting-filter"
  ) as HTMLSelectElement | null;
  if (!sortingFilter) return;

  sortingFilter.addEventListener("change", (event) => {
    handleSort(
      (event.target as HTMLSelectElement).value,
      restaurantList,
      restaurantListElement
    );
  });

  restaurantAddForm.addEventListener("submit", (event) =>
    handleAddRestaurantFormSubmit(event, restaurantList, restaurantAddForm)
  );

  // Escape 키로 다이얼로그 닫기 (fallback)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const dialogs = document.getElementsByTagName("dialog");
      if (dialogs.length > 0 && dialogs[0].open) {
        dialogs[0].close();
      }
    }
  });
}
