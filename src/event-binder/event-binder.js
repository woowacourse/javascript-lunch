import {
  handleFormModalToggle,
  handleDescriptionModalToggle,
} from "../event-handler/modalHandler.js";
import {
  handleAddRestaurantFormSubmit,
  handleFavoriteToggle,
} from "../event-handler/restaurantHandlers.js";

import {
  handleSort,
  handleCombinedFilter,
} from "../event-handler/sortFilterHandlers.js";
export default function bindEventHandlers(
  restaurantList,
  restaurantListElement,
  restaurantAddForm
) {
  document.body.addEventListener("click", (event) => {
    handleFormModalToggle(event);
    handleDescriptionModalToggle(event, restaurantList);
    handleFavoriteToggle(event, restaurantList, restaurantListElement);
  });
  const filterElement = document.querySelectorAll(
    "#category-filter, #favorite-filter"
  );

  for (const el of filterElement) {
    el.addEventListener("change", () => {
      handleCombinedFilter(restaurantListElement, restaurantList);
    });
  }

  document
    .getElementById("sorting-filter")
    .addEventListener("change", (event) => {
      handleSort(event.target.value, restaurantList, restaurantListElement);
    });

  restaurantAddForm.addEventListener("submit", (event) =>
    handleAddRestaurantFormSubmit(event, restaurantList, restaurantAddForm)
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const dialogs = document.getElementsByTagName("dialog");
      if (dialogs.length > 0 && dialogs[0].open) {
        dialogs[0].close(); // esc로 닫기
      }
    }
  });
}
