import $header from "./components/layout/header.ts";
import $restaurantItem from "./components/restaurant/restaurant-item.ts";
import $inputItem from "./components/form-elements/input-item.ts";
import $modal from "./components/modal/modal.ts";
import $button from "./components/common/button.ts";
import $buttonContainer from "./components/layout/button-container.ts";
import $filter from "./components/common/filter.ts";
import { UI_CONFIG } from "./constants/uiConfig.ts";
import { restaurantData } from "./data/restaurant.ts";
import { FORM_FIELDS } from "./constants/formFields.ts";
import { FILTERS } from "./constants/filters.ts";

addEventListener("load", () => {
  document.body.prepend($header(UI_CONFIG.HEADER));

  // 카테고리 / 정렬 필터
  const restaurantFilter = document.querySelector(".restaurant-filter-container");
  if (!restaurantFilter) return;

  const listFilters = [
    $filter(FILTERS.CATEGORY),
    $filter(FILTERS.SORT),
  ];

  listFilters.forEach((data) => {
    restaurantFilter.appendChild(data);
  });

  
  // 음식점 목록
  const restaurantList = document.querySelector(".restaurant-list");
  if (!restaurantList) return;
  restaurantData.forEach((data) => {
    restaurantList.appendChild($restaurantItem(data));
  });

  const submitCancelButtons = $buttonContainer({
    buttons: [
      $button(UI_CONFIG.BUTTONS.CANCEL),
      $button(UI_CONFIG.BUTTONS.ADD),
    ],
  });

  const restaurantAddForm = [
    $inputItem(FORM_FIELDS.SELECTS, "category"),
    $inputItem(FORM_FIELDS.INPUTS, "name"),
    $inputItem(FORM_FIELDS.SELECTS, "distance"),
    $inputItem(FORM_FIELDS.TEXTAREAS, "description"),
    $inputItem(FORM_FIELDS.INPUTS, "link"),
    submitCancelButtons,
  ];

  const main = document.querySelector("main");
  if (!main) return;
  main.appendChild($modal({form: restaurantAddForm}));
});
