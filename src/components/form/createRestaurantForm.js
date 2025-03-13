import $button from "../common/button.js";
import $buttonContainer from "../layout/button-container.js";
import $inputItem from "./input-item.js";
import $form from "./form.js";
import { addRestaurant } from "./formEvent.js";
import { UI_CONFIG } from "../../constants/uiConfig.js";
import { FORM_FIELDS } from "../../constants/formFields.js";
import { handleModalOpen } from "../modal/modal.js";

const $createRestaurantForm = () => {
  const container = document.querySelector(".modal-container");
  container.replaceChildren();

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
  container.appendChild($form(restaurantAddForm, addRestaurant));

  handleModalOpen();
};

export default $createRestaurantForm;
