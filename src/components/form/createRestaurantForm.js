import $button from "../common/button";
import $buttonContainer from "../layout/button-container";
import $inputItem from "./input-item";
import $form from "./form";
import { FORM_EVENT } from "./formEvent";
import { UI_CONFIG } from "../../constants/uiConfig";
import { FORM_FIELDS } from "../../constants/formFields";

const $createRestaurantForm = () => {
  const container = document.createElement("div");
  container.classList.add("modal-container");
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
  const title = document.createElement("h2");
  title.classList.add("modal-title", "text-title");
  title.textContent = "새로운 음식점";
  container.appendChild(title);
  container.appendChild($form(restaurantAddForm, FORM_EVENT.addRestaurant));

  return container;
};

export default $createRestaurantForm;
