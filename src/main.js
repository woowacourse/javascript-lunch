import $header from "./components/layout/header.js";
import $restaurantItem from "./components/restaurant/restaurant-item.js";
import $inputItem from "./components/form/input-item.js";
import $modal from "./components/modal/modal.js";
import $button from "./components/common/button.js";
import $buttonContainer from "./components/layout/button-container.js";
import $select from "./components/common/select.js";
import $filterContainer from "./components/layout/filter-container.js";
import $tabContainer from "./components/layout/tabContainer.js";
import $tab from "./components/common/tab.js";
import { FORM_FIELDS } from "./constants/formFields.js";
import { storageHandler } from "./utils/storageHandler.js";
import { STORAGE_KEY_NAME } from "./constants/storage.js";
import { UI_CONFIG } from "./constants/uiConfig.js";

const initialRestaurantData = () => {
  const restaurantList = document.querySelector(".restaurant-list");
  const restaurantItems = storageHandler.getItem(STORAGE_KEY_NAME);

  if (restaurantItems.length > 0) {
    return restaurantItems.reverse().forEach((item) => {
      restaurantList.appendChild($restaurantItem(item));
    });
  }

  const noRestaurant = document.createElement("p");
  noRestaurant.id = "noRestaurant";
  noRestaurant.textContent = "등록된 음식점이 없습니다.";
  restaurantList.appendChild(noRestaurant);
};

addEventListener("load", () => {
  document.body.prepend($header(UI_CONFIG.HEADER));

  const navigationTabs = $tabContainer([
    $tab(UI_CONFIG.TABS.ALL),
    $tab(UI_CONFIG.TABS.FAVORITE),
  ]);
  const filterSelects = [
    FORM_FIELDS.SELECTS.create(FORM_FIELDS.SELECTS.categoryFilter),
    FORM_FIELDS.SELECTS.create(FORM_FIELDS.SELECTS.sortingFilter),
  ];
  document.querySelector("main").prepend($filterContainer(filterSelects));
  document.querySelector("main").prepend(navigationTabs);
  document.querySelector("main").appendChild($modal());

  initialRestaurantData();
});
