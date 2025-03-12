import $header from "./components/layout/header.ts";
import $inputItem from "./components/form-elements/input-item.ts";
import $modal from "./components/modal/modal.ts";
import $button from "./components/common/button.ts";
import $buttonContainer from "./components/layout/button-container.ts";
import $filter from "./components/common/filter.ts";
import { UI_CONFIG } from "./constants/uiConfig.ts";
import { restaurantData } from "./data/restaurant.ts";
import { FORM_FIELDS } from "./constants/formFields.ts";
import { FILTERS } from "./constants/filters.ts";
import { filterRestaurants } from "./utils/filterUtils.ts";
import { renderRestaurants } from "./utils/renderUtils.ts";

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

  const categoryFilter = document.querySelector("#category-filter");
  const sortingFilter = document.querySelector("#sorting-filter");
  const restaurantList = document.querySelector(".restaurant-list") as HTMLElement | null;

  if (!categoryFilter || !sortingFilter || !restaurantList) return;
  
  let selectedCategory = "";
  let selectedSorting = "name";

  const updateList = () => {
    // 카테고리별 필터링
    const filtered = filterRestaurants(restaurantData, selectedCategory);
    // 정렬
    // 렌더링
    renderRestaurants(restaurantList, filtered);
  }

  categoryFilter.addEventListener("change", (e) => {
    selectedCategory = (e.target as HTMLSelectElement)?.value || selectedCategory;
    updateList();
  });

  updateList();

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
