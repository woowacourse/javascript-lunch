import $header from "./components/layout/header.js";
import $modal from "./components/modal/modal.js";
import $filterContainer from "./components/layout/filterContainer.js";
import $tabContainer from "./components/layout/tabContainer.js";
import $tab from "./components/common/tab.js";
import $createRestaurantList from "./components/restaurant/restaurantItemList.js";
import { FORM_FIELDS } from "./constants/formFields.js";
import { UI_CONFIG } from "./constants/uiConfig.js";

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

  $createRestaurantList();
});
