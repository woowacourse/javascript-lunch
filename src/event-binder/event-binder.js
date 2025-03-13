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
    const target = event.target;

    if (target.closest("#category-filter, #favorite-filter")) {
      handleCombinedFilter(restaurantListElement, restaurantList);
    }

    handleFormModalToggle(event);
    handleDescriptionModalToggle(event, restaurantList);
    handleFavoriteToggle(event, restaurantList, restaurantListElement);
  });

  // 필터 요소에 대한 change 이벤트 리스너 추가
  const filterElements = document.querySelectorAll(
    "#category-filter, #favorite-filter"
  );

  filterElements.forEach((el) => {
    el.addEventListener("change", () => {
      handleCombinedFilter(restaurantListElement, restaurantList);
    });
  });

  // 소팅 필터는 change 이벤트로 처리
  document
    .getElementById("sorting-filter")
    .addEventListener("change", (event) => {
      handleSort(event.target.value, restaurantList, restaurantListElement);
    });

  // 레스토랑 추가 폼 제출 이벤트
  restaurantAddForm.addEventListener("submit", (event) =>
    handleAddRestaurantFormSubmit(event, restaurantList, restaurantAddForm)
  );

  // Escape 키로 다이얼로그 닫기
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const dialogs = document.getElementsByTagName("dialog");
      if (dialogs.length > 0 && dialogs[0].open) {
        dialogs[0].close();
      }
    }
  });
}
