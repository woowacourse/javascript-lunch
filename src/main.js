import $header from "./components/layout/header.js";
import $restaurantItem from "./components/restaurant/restaurant-item.js";
import $inputItem from "./components/form-elements/input-item.js";
import $modal from "./components/modal/modal.js";
import $button from "./components/common/button.js";
import $buttonContainer from "./components/layout/button-container.js";
import { UI_CONFIG } from "./constants/uiConfig.js";
import { restaurantData } from "./data/restaurant.js";
import { FORM_FIELDS } from "./constants/formFields.js";

addEventListener("load", () => {
  document.body.prepend($header(UI_CONFIG.HEADER));

  const restaurantList = document.querySelector(".restaurant-list");
  restaurantData.forEach((data) => {
    restaurantList.appendChild($restaurantItem(data));
  });

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
