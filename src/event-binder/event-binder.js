import {
  handleFormModalToggle,
  handleDescriptionModalToggle,
} from "../event-handler/modalHandler.js";
import {
  handleAddRestaurantFormSubmit,
  handleDeleteRestaurant,
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
    const target = event.target;

    if (target.closest("#delete-button")) {
      handleDeleteRestaurant(event, restaurantList, restaurantListElement);
    }

    handleFormModalToggle(event);
    handleDescriptionModalToggle(event, restaurantList);
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

  document
    .getElementById("sorting-filter")
    .addEventListener("change", (event) => {
      handleSort(event.target.value, restaurantList, restaurantListElement);
    });

  restaurantAddForm.addEventListener("submit", (event) =>
    handleAddRestaurantFormSubmit(event, restaurantList, restaurantAddForm)
  );

  // Escape 키로 다이얼로그 닫기
  // showModal()를 쓰면 Toast가 가려지는 이슈가 있습니다.
  // 해당 문제를 해결하기 위해, show()를 하였고,
  // 다만, 이경우에는, dialog를 esc로 닫을수 없습니다.
  // 그러기에, fallback으로 집어 넣은 코드입니다.

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const dialogs = document.getElementsByTagName("dialog");
      if (dialogs.length > 0 && dialogs[0].open) {
        dialogs[0].close();
      }
    }
  });
}
