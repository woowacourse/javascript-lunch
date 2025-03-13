import $header from "./components/layout/header.js";
import $restaurantItem from "./components/restaurant/restaurant-item.js";
import $inputItem from "./components/form/input-item.js";
import $modal from "./components/modal/modal.js";
import $button from "./components/common/button.js";
import $buttonContainer from "./components/layout/button-container.js";
import { UI_CONFIG } from "./constants/uiConfig.js";
import { FORM_FIELDS } from "./constants/formFields.js";
import $select from "./components/common/select.js";
import $filterContainer from "./components/layout/filter-container.js";
import { storageHandler } from "./utils/storageHandler.js";
import { STORAGE_KEY_NAME } from "./constants/storage.js";

const initialRestaurantData = () => {
  const restaurantList = document.querySelector(".restaurant-list");
  const list = storageHandler.getItem(STORAGE_KEY_NAME);

  if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      restaurantList.appendChild($restaurantItem(list[i]));
    }
    return;
  }

  const noRestaurant = document.createElement("p");
  noRestaurant.id = "noRestaurant";
  noRestaurant.textContent = "등록된 음식점이 없습니다.";
  restaurantList.appendChild(noRestaurant);
};

addEventListener("load", () => {
  document.body.prepend($header(UI_CONFIG.HEADER));

  const filterSelects = [
    FORM_FIELDS.SELECTS.create(FORM_FIELDS.SELECTS.categoryFilter),
    FORM_FIELDS.SELECTS.create(FORM_FIELDS.SELECTS.sortingFilter),
  ];
  document.querySelector("main").prepend($filterContainer(filterSelects));

  initialRestaurantData();

  const submitCancelButtons = $buttonContainer([
    $button(UI_CONFIG.BUTTONS.CANCEL),
    $button(UI_CONFIG.BUTTONS.ADD),
  ]);

  const restaurantAddForm = [
    $inputItem(FORM_FIELDS.SELECTS, "category"),
    $inputItem(FORM_FIELDS.INPUTS, "name"),
    $inputItem(FORM_FIELDS.SELECTS, "distance"),
    $inputItem(FORM_FIELDS.TEXTAREAS, "description"),
    $inputItem(FORM_FIELDS.INPUTS, "link"),
    submitCancelButtons,
  ];

  document.querySelector("main").appendChild($modal(restaurantAddForm));
});
