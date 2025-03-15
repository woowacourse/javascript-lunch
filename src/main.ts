import RestaurantList from "./model/RestaurantList.js";
import { INITIAL_RESTAURANT } from "./settings/restaurant.ts";
import createRestaurantForm from "./components/restaurant/form/form.js";
import createRestaurantItem from "./components/restaurant/item/item.js";

import { handleSort } from "./event-handler/sortFilterHandlers.js";

import bindEventHandlers from "./event-binder/event-binder.ts";
import type { AppState } from "../types/restaurantTypes.js";
function initializeApp(): AppState {
  const modalContainer = document.querySelector(
    ".modal-container"
  ) as HTMLElement | null;
  const restaurantListElement = document.querySelector(
    ".restaurant-list"
  ) as HTMLElement | null;
  const restaurantForm = createRestaurantForm();

  if (!modalContainer || !restaurantListElement) {
    throw new Error("Required elements not found in the DOM.");
  }

  modalContainer.appendChild(restaurantForm);

  const restaurantAddForm = document.querySelector(
    ".restaurant-add-form"
  ) as HTMLElement | null;
  if (!restaurantAddForm) {
    throw new Error("Restaurant add form element not found.");
  }

  const restaurantList = loadRestaurantList();

  return {
    restaurantList,
    restaurantListElement,
    restaurantAddForm,
  };
}

function loadRestaurantList() {
  const savedList = localStorage.getItem("restaurantList");
  const initialList = JSON.parse(savedList) ?? [...INITIAL_RESTAURANT];
  localStorage.setItem("restaurantList", JSON.stringify(initialList));
  // 이것을 주석을 해제 해서 favorite와 filter 또한 미리 불러 올수 있습니다.
  // 다만, 이러면 새로 고침을 했을때 초기의 페이지를 바라는 사용자의 기대와
  // 다른 behavior라 생각되어 주석 처리 했습니다.

  // if (localStorage.getItem("favorite")) {
  //   handleCombinedFilter(localStorage.getItem("favorite"));
  //   document.getElementById("favorite-filter").value =
  //     localStorage.getItem("favortie");
  // }
  // if (localStorage.getItem("filter")) {
  //   handleCombinedFilter(localStorage.getItem("category"));
  //   document.getElementById("category-filter").value =
  //     localStorage.getItem("filter");
  // }

  return new RestaurantList(initialList);
}

function renderRestaurantList(
  restaurantList: RestaurantList,
  restaurantListElement: HTMLElement
) {
  restaurantList.List.forEach((restaurantItem) =>
    restaurantListElement.appendChild(createRestaurantItem(restaurantItem))
  );
}

function setSorting(
  restaurantList: RestaurantList,
  restaurantListElement: HTMLElement
) {
  const sortOption = localStorage.getItem("sort");
  if (sortOption) {
    handleSort(sortOption, restaurantList, restaurantListElement);

    document.getElementById("sorting-filter").value = sortOption;
  }
}
function init() {
  const { restaurantList, restaurantListElement, restaurantAddForm } =
    initializeApp();

  renderRestaurantList(restaurantList, restaurantListElement);

  setSorting(restaurantList, restaurantListElement);

  return { restaurantList, restaurantListElement, restaurantAddForm };
}

document.addEventListener("DOMContentLoaded", () => {
  const appState = init();

  bindEventHandlers(appState);
});
