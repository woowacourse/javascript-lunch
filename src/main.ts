import $header from "./components/layout/header.ts";
import $restaurantItem from "./components/restaurant/restaurant-item.ts";
import $inputItem from "./components/form-elements/input-item.ts";
import $modal from "./components/modal/modal.ts";
import $button from "./components/common/button.ts";
import $buttonContainer from "./components/layout/button-container.ts";
import { UI_CONFIG } from "./constants/uiConfig.ts";
import { restaurantData } from "./data/restaurant.ts";
import { FORM_FIELDS } from "./constants/formFields.ts";

addEventListener("load", () => {
  document.body.prepend($header(UI_CONFIG.HEADER));

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
